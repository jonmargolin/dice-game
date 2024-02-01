import { Test, TestingModule } from '@nestjs/testing';
import { ServerSideUpdateController } from './serverSideUpdate.controller';

describe('ServerSideUpdateController', () => {
  let controller: ServerSideUpdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServerSideUpdateController],
    }).compile();

    controller = module.get<ServerSideUpdateController>(ServerSideUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
