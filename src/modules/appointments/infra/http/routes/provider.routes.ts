import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProvidersController';
import ProviderMonthAvailability from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailability from '../controllers/ProviderDayAvailabilityController';

const providersRouter = Router();

const providerController = new ProviderController();
const providerMonthController = new ProviderMonthAvailability();
const providerDayController = new ProviderDayAvailability();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providerController.index);

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthController.index,
);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayController.index,
);

export default providersRouter;
