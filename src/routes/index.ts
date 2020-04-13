import { Router } from 'express';
import appointmentsRouter from './appoiments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
