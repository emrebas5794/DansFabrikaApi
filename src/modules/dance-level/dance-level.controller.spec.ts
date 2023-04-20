import { Test, TestingModule } from '@nestjs/testing';
import { DanceLevelController } from './dance-level.controller';
import { DanceLevelService } from './dance-level.service';

describe('DanceLevelController', () => {
  let controller: DanceLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DanceLevelController],
      providers: [DanceLevelService],
    }).compile();

    controller = module.get<DanceLevelController>(DanceLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
