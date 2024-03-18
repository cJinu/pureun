import { Test, TestingModule } from '@nestjs/testing';
import { PotStateService } from './pot-state.service';

describe('PotStateService', () => {
  let service: PotStateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PotStateService],
    }).compile();

    service = module.get<PotStateService>(PotStateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
