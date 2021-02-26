import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import SurveysUsersRepository from '../repositories/SurveysUsersRepositories';

class NpsController {
  async execute(request: Request, response: Response) {
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
    const { surveyId } = request.params;

    const surveysUsers = await surveysUsersRepository.find({
      surveyId,
      value: Not(IsNull()),
    });

    const detractor = surveysUsers.filter((survey) => survey.value >= 0
      && survey.value <= 6).length;
    const promotors = surveysUsers.filter((survey) => survey.value >= 9
      && survey.value <= 10).length;
    const passive = surveysUsers.filter((survey) => survey.value >= 7
      && survey.value <= 8).length;

    const totalAnswers = surveysUsers.length;
    const calculate = ((promotors - detractor) / totalAnswers) * 100;

    return response.json({
      detractor,
      promotors,
      passive,
      totalAnswers,
      nps: calculate,
    });
  }
}
const npsController = new NpsController();
export default npsController;
