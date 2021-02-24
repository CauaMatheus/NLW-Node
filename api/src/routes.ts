import { Router } from 'express';
import surveysController from './controllers/SurveysController';
import userController from './controllers/UserController';

const router = Router();

router.post('/users', userController.create);

router.get('/surveys', surveysController.show);
router.post('/surveys', surveysController.create);

export default router;
