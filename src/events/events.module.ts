import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import {PrismaService} from "../prisma/prisma.service";
import {PrismaModule} from "../prisma/prisma.module";
import {OpenaiModule} from "../openai/openai.module";

@Module({
  controllers: [EventsController],
  providers: [EventsService],
  imports: [PrismaModule, OpenaiModule]
})
export class EventsModule {}
