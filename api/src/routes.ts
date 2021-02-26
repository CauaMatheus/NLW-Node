import { Router } from 'express';
import surveysController from './controllers/SurveysController';
import userController from './controllers/UserController';
import sendMailController from './controllers/SendMailController';
import answerController from './controllers/AnswerController';
import npsController from './controllers/NpsController';

const router = Router();

router.post('/users', userController.create);

router.get('/surveys', surveysController.show);
router.post('/surveys', surveysController.create);

router.post('/sendMail', sendMailController.execute);

router.get('/answers/:value', answerController.execute);

router.get('/nps/:surveyId', npsController.execute);
export default router;
