import {Test, TestingModule} from '@nestjs/testing';
import {EventsService} from './events.service';
import {PrismaModule} from "../prisma/prisma.module";

describe('EventsService', () => {
    let service: EventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EventsService],
            imports: [PrismaModule]
        }).compile();

        service = module.get<EventsService>(EventsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
