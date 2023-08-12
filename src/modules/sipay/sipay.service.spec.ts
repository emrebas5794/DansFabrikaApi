import { Test, TestingModule } from '@nestjs/testing';
import { SipayService } from './sipay.service';

describe('SipayService', () => {
  let service: SipayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SipayService],
    }).compile();

    service = module.get<SipayService>(SipayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
