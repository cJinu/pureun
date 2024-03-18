import { Test, TestingModule } from '@nestjs/testing';
import { PotController } from './pot.controller';

describe('PotController', () => {
  let controller: PotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PotController],
    }).compile();

    controller = module.get<PotController>(PotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
