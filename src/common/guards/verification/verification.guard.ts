import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class VerificationGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.verification) {
      try {
        
        const res = this.jwtService.verify(request.headers.verification);
        request.user = res;
        return true;
      } catch (error) {
        console.log("burada");
        throw new UnauthorizedException();
      }
    }
    console.log("burada");
    throw new UnauthorizedException();
  }
}
