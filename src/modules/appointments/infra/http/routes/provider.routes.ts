import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProvidersController';

const providersRouter = Router();
const providerController = new ProviderController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.create);

export default providersRouter;
