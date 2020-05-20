import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointment = container.resolve(
      ListProvidersAppointmentsService,
    );

    const appointments = await listProviderAppointment.execute({
      day,
      month,
      year,
      provider_id,
    });

    return response.json(appointments);
  }
}
