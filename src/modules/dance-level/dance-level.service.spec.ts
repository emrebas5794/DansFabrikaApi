import { Test, TestingModule } from '@nestjs/testing';
import { DanceLevelService } from './dance-level.service';

describe('DanceLevelService', () => {
  let service: DanceLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DanceLevelService],
    }).compile();

    service = module.get<DanceLevelService>(DanceLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
