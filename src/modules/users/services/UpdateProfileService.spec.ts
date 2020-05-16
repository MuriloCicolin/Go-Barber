import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfile from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfile(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      email: 'murilo@gmail.com',
      name: 'Murilo',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'Murilo 2',
      email: 'murilo@hotmail.com',
    });

    expect(user.name).toBe('Murilo 2');
    expect(user.email).toBe('murilo@hotmail.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com',
      password: '132456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Murilo 2',
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'john@example.com',
      old_password: '123456',
      password: '147147',
    });

    expect(updatedUser.password).toBe('147147');
  });

  it('should not be able to update user password without oldPassword', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john@example.com',
        password: '147147',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update user password without wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Trê',
        email: 'john@example.com',
        old_password: '123123',
        password: '147147',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
