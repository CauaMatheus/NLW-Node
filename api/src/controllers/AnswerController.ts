import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import SurveysUsersRepository from '../repositories/SurveysUsersRepositories';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError('Survey user does not exist!', 400);
    }
    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);
    return response.json(surveyUser);
  }
}
const answerController = new AnswerController();
export default answerController;
