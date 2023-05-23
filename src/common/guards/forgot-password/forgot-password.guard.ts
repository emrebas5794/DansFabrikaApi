import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { EVerificationType } from 'src/common/enums/verification-type.enum';

@Injectable()
export class ForgotPasswordGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.verification) {
      try {
        const jwt: any = this.jwtService.decode(request.headers.verification);
        if (jwt.type !== EVerificationType.FORGOT_PASSWORD) { throw new UnauthorizedException(); }
        const res = this.jwtService.verify(request.headers.verification);
        request.user = res;
        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
    throw new UnauthorizedException();
  }
}
