import { ForgotPasswordGuard } from './forgot-password.guard';

describe('ForgotPasswordGuard', () => {
  it('should be defined', () => {
    expect(new ForgotPasswordGuard()).toBeDefined();
  });
});
