import { resolve } from 'path';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import sendMailService from '../services/sendMailService';
import UserRepository from '../repositories/UserRepositories';
import SurveysRepository from '../repositories/SurveysRepositories';
import SurveysUsersRepository from '../repositories/SurveysUsersRepositories';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, surveyId } = request.body;
    const userRepositories = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const user = await userRepositories.findOne({ email });
    if (!user) {
      return response.status(400).json({
        error: 'User does not exist',
      });
    }

    const survey = await surveysRepository.findOne({ id: surveyId });
    if (!survey) {
      return response.status(400).json({
        error: 'Survey does not exist',
      });
    }

    const path = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{ userId: user.id }, { value: null }],
      relations: ['user', 'survey'],
    });
    if (surveyUserAlreadyExists) {
      await sendMailService.execute({
        to: email,
        subject: survey.title,
        description: survey.description,
        userId: user.id,
      }, path);
      return response.json(surveyUserAlreadyExists);
    }

    const surveyUser = surveysUsersRepository.create({
      userId: user.id,
      surveyId,
    });
    await surveysUsersRepository.save(surveyUser);

    await sendMailService.execute({
      to: email,
      subject: survey.title,
      description: survey.description,
      userId: user.id,
    }, path);

    return response.status(201).json(surveyUser);
  }
}
const sendMailController = new SendMailController();
export default sendMailController;
