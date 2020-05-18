import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProvider = container.resolve(ListProviderService);

    const providers = await listProvider.execute({
      user_id,
    });

    return response.json(providers);
  }
}
