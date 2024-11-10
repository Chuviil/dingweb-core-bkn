import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { OpenaiService } from './openai/openai.service';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [EventsModule, PrismaModule, OpenaiModule],
  controllers: [],
  providers: [PrismaService, OpenaiService],
})
export class AppModule {}
