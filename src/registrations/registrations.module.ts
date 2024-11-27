import {Module} from '@nestjs/common';
import {RegistrationsService} from './registrations.service';
import {RegistrationsController} from './registrations.controller';
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    controllers: [RegistrationsController],
    providers: [RegistrationsService],
    imports: [PrismaModule],
})
export class RegistrationsModule {
}
