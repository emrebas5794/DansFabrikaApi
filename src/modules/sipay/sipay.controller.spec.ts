import { Test, TestingModule } from '@nestjs/testing';
import { SipayController } from './sipay.controller';
import { SipayService } from './sipay.service';

describe('SipayController', () => {
  let controller: SipayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SipayController],
      providers: [SipayService],
    }).compile();

    controller = module.get<SipayController>(SipayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
