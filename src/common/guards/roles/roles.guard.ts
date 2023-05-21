import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ERoles } from 'src/common/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<number[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!request.user.status) { return false; }
    if (request.user.status < 1) { return false; }

    if (request.user.role === undefined) {
      if (!roles.includes(ERoles.STUDENT)) { return false; }
    }
    else {
      if (roles.includes(ERoles.STUDENT)) {
        if (!roles.includes(ERoles.ADMIN)) { return false; }
      }
      else {
        if (request.user.role < Math.min(...roles)) { return false; }
      }
    }
    return true;
  }
}
