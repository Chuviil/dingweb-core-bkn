import { Test, TestingModule } from '@nestjs/testing';
import { ActivitiesService } from './activities.service';
import {PrismaModule} from "../prisma/prisma.module";

describe('ActivitiesService', () => {
  let service: ActivitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitiesService],
      imports: [PrismaModule]
    }).compile();

    service = module.get<ActivitiesService>(ActivitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
