import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";


@Injectable()
export class StudentStrategy extends PassportStrategy(Strategy, "student") {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(email, password): Promise<any> {
        const user = await this.authService.validateStudentCredentials({ email, password });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
} 