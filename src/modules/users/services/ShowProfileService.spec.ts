import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfileService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

let showProfile: ShowProfileService;
let fakeUsersRepository: FakeUsersRepository;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123465',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not  be able to show the profile with non-existing user', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
