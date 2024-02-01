import { Test, TestingModule } from '@nestjs/testing';
import { CountDownService } from './count-down.service';

describe('CountDownService', () => {
  let service: CountDownService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountDownService],
    }).compile();

    service = module.get<CountDownService>(CountDownService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
