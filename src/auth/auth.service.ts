import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {LoginAuthDto} from './dto/login-auth.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {
    }

    async login(loginAuthDto: LoginAuthDto) {
        const userFound = await this.prismaService.user.findUnique({
            where: {
                username: loginAuthDto.username
            }
        });

        if (!userFound) throw new NotFoundException('User not found');
        if (userFound.password !== loginAuthDto.password)
            throw new ForbiddenException()

        return userFound;
    }
}
