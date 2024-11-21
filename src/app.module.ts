import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { OpenaiService } from './openai/openai.service';
import { OpenaiModule } from './openai/openai.module';
import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventsModule, PrismaModule, OpenaiModule, ActivitiesModule, AuthModule],
  controllers: [],
  providers: [PrismaService, OpenaiService],
})
export class AppModule {}
