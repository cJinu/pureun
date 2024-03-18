import { Test, TestingModule } from '@nestjs/testing';
import { CalenderService } from './calender.service';

describe('CalenderService', () => {
  let service: CalenderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalenderService],
    }).compile();

    service = module.get<CalenderService>(CalenderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
