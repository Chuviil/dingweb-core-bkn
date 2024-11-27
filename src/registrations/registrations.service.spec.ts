import {Test, TestingModule} from '@nestjs/testing';
import {RegistrationsService} from './registrations.service';
import {PrismaModule} from "../prisma/prisma.module";

describe('RegistrationsService', () => {
    let service: RegistrationsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RegistrationsService],
            imports: [PrismaModule]
        }).compile();

        service = module.get<RegistrationsService>(RegistrationsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
