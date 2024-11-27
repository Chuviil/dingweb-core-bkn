import {Test, TestingModule} from '@nestjs/testing';
import {RegistrationsController} from './registrations.controller';
import {RegistrationsService} from './registrations.service';
import {PrismaModule} from "../prisma/prisma.module";

describe('RegistrationsController', () => {
    let controller: RegistrationsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RegistrationsController],
            providers: [RegistrationsService],
            imports: [PrismaModule]
        }).compile();

        controller = module.get<RegistrationsController>(RegistrationsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
