import { Router } from 'express';
import surveysController from './controllers/SurveysController';
import userController from './controllers/UserController';
import sendMailController from './controllers/SendMailController';

const router = Router();

router.post('/users', userController.create);

router.get('/surveys', surveysController.show);
router.post('/surveys', surveysController.create);

router.post('/sendMail', sendMailController.execute);
export default router;
