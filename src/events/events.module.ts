import {Module} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventsController} from './events.controller';
import {PrismaModule} from "../prisma/prisma.module";
import {EventAnalysisService} from "./events_analysis.service";

@Module({
    controllers: [EventsController],
    providers: [EventsService, EventAnalysisService],
    imports: [PrismaModule],
})
export class EventsModule {
}
