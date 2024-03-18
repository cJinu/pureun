import { Test, TestingModule } from '@nestjs/testing';
import { CalenderController } from './calender.controller';

describe('CalenderController', () => {
  let controller: CalenderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalenderController],
    }).compile();

    controller = module.get<CalenderController>(CalenderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
