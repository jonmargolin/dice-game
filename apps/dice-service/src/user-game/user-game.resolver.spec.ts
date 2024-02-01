import { Test, TestingModule } from '@nestjs/testing';
import { UserGameResolver } from './user-game.resolver';

describe('UserGameResolver', () => {
  let resolver: UserGameResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGameResolver],
    }).compile();

    resolver = module.get<UserGameResolver>(UserGameResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
