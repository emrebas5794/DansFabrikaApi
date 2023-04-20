import { Test, TestingModule } from '@nestjs/testing';
import { DanceTypeService } from './dance-type.service';

describe('DanceTypeService', () => {
  let service: DanceTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DanceTypeService],
    }).compile();

    service = module.get<DanceTypeService>(DanceTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
