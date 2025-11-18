import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from 'src/tasks/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let repo: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createUser should call repository.create and save', async () => {
    const user = { id: 1, username: 'Max', email: 'test@mail.com', passwordHash: 'hash' } as User;
    repo.create.mockReturnValue(user);
    repo.save.mockResolvedValue(user);

    const result = await service.createUser('Max', 'test@mail.com', 'hash');

    expect(repo.create).toHaveBeenCalledWith({ username: 'Max', email: 'test@mail.com', passwordHash: 'hash' });
    expect(repo.save).toHaveBeenCalledWith(user);
    expect(result).toEqual(user);
  });

  it('getAllUser should call repository.find with relations', async () => {
    const users = [{ id: 1 }] as User[];
    repo.find.mockResolvedValue(users);

    const result = await service.getAllUser();

    expect(repo.find).toHaveBeenCalledWith({ relations: ['tasks'] });
    expect(result).toEqual(users);
  });

  it('getUserById should call repository.findOne with id and relations', async () => {
    const user = { id: 1 } as User;
    repo.findOne.mockResolvedValue(user);

    const result = await service.getUserById(1);

    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['tasks'] });
    expect(result).toEqual(user);
  });

  it('updateUser should call repository.update', async () => {
    repo.update.mockResolvedValue({} as any);

    await service.updateUser(1, 'Max', 'test@mail.com');

    expect(repo.update).toHaveBeenCalledWith(1, { id: 1, username: 'Max', email: 'test@mail.com' });
  });

  it('deleteUser should call repository.delete and return {deleted:true}', async () => {
    repo.delete.mockResolvedValue({} as any);

    const result = await service.deleteUser(1);

    expect(repo.delete).toHaveBeenCalledWith(1);
    expect(result).toEqual({ deleted: true });
  });

  it('findOne should call repository.findOne with username', async () => {
    const user = { id: 1, username: 'Max' } as User;
    repo.findOne.mockResolvedValue(user);

    const result = await service.findOne('Max');

    expect(repo.findOne).toHaveBeenCalledWith({ where: { username: 'Max' } });
    expect(result).toEqual(user);
  });
});
