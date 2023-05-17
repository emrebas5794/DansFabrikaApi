import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT, ExtractJwt.fromAuthHeaderAsBearerToken()]),
            ignoreExpiration: false,
            secretOrKey: configService.get('SECRET_KEY')
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        return payload;
    }

    private static extractJWT(req: Request): string | null {
        if (req.cookies && 'token' in req.cookies && req.cookies.token.length > 0) {
            return req.cookies.token
        }
        return null;
    }
}