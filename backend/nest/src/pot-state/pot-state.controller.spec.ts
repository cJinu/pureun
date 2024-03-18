import { Test, TestingModule } from '@nestjs/testing';
import { PotStateController } from './pot-state.controller';

describe('PotStateController', () => {
  let controller: PotStateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PotStateController],
    }).compile();

    controller = module.get<PotStateController>(PotStateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
