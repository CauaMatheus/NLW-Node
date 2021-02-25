import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import SurveysRepository from '../repositories/SurveysRepositories';
import SurveysUsersRepository from '../repositories/SurveysUsersRepositories';
import UserRepository from '../repositories/UserRepositories';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, surveyId } = request.body;
    const userRepositories = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const userAlreadyExists = await userRepositories.findOne({ email });
    if (!userAlreadyExists) {
      return response.status(400).json({
        error: 'User does not exist',
      });
    }

    const surveyAlreadyExists = await surveysRepository.findOne({ id: surveyId });
    if (!surveyAlreadyExists) {
      return response.status(400).json({
        error: 'Survey does not exist',
      });
    }

    const surveyUser = surveysUsersRepository.create({
      userID: userAlreadyExists.id,
      surveyId,
    });
    await surveysUsersRepository.save(surveyUser);

    return response.status(201).json(surveyUser);
  }
}
const sendMailController = new SendMailController();
export default sendMailController;
