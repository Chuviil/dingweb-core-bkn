import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {SignInAuthDto} from './dto/sign-in-auth.dto';
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService) {
    }

    async signin(signInAuthDto: SignInAuthDto) {
        console.log(signInAuthDto)

        const user = await this.prisma.user.findUnique({where: {email: signInAuthDto.email}});

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (user.role == 'USER' || user.password !== signInAuthDto.password) {
            throw new UnauthorizedException('User not authorized');
        }

        return user;
    }
}
