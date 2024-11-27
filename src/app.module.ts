import {Module} from '@nestjs/common';
import {PrismaService} from './prisma/prisma.service';
import {PrismaModule} from './prisma/prisma.module';
import {OpenaiService} from './openai/openai.service';
import {OpenaiModule} from './openai/openai.module';
import {UsersModule} from './users/users.module';
import {EventsModule} from './events/events.module';
import {ActivitiesModule} from './activities/activities.module';
import {RegistrationsModule} from './registrations/registrations.module';
import {AuthModule} from './auth/auth.module';

@Module({
    imports: [PrismaModule, OpenaiModule, UsersModule, EventsModule, ActivitiesModule, RegistrationsModule, AuthModule],
    controllers: [],
    providers: [PrismaService, OpenaiService],
})
export class AppModule {
}
