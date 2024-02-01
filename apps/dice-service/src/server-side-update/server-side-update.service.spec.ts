import { Test, TestingModule } from '@nestjs/testing';
import { ServerSideUpdateService } from './server-side-update.service';

describe('ServerSideUpdateService', () => {
  let service: ServerSideUpdateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServerSideUpdateService],
    }).compile();

    service = module.get<ServerSideUpdateService>(ServerSideUpdateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
