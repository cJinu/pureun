import { Test, TestingModule } from '@nestjs/testing';
import { PotService } from './pot.service';

describe('PotService', () => {
  let service: PotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PotService],
    }).compile();

    service = module.get<PotService>(PotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
