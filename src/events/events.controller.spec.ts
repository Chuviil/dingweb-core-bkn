import {Test, TestingModule} from '@nestjs/testing';
import {EventsController} from './events.controller';
import {EventsService} from './events.service';
import {PrismaModule} from "../prisma/prisma.module";
import {EventAnalysisService} from "./events_analysis.service";

describe('EventsController', () => {
    let controller: EventsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [EventsController],
            providers: [EventsService, EventAnalysisService],
            imports: [PrismaModule]
        }).compile();

        controller = module.get<EventsController>(EventsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
