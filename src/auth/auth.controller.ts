import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {SignInAuthDto} from './dto/sign-in-auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('signin')
    create(@Body() signInAuthDto: SignInAuthDto) {
        return this.authService.signin(signInAuthDto);
    }
}
