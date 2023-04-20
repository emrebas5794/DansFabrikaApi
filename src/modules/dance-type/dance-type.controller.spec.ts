import { Test, TestingModule } from '@nestjs/testing';
import { DanceTypeController } from './dance-type.controller';
import { DanceTypeService } from './dance-type.service';

describe('DanceTypeController', () => {
  let controller: DanceTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DanceTypeController],
      providers: [DanceTypeService],
    }).compile();

    controller = module.get<DanceTypeController>(DanceTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
