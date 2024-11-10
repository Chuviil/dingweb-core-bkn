import { Injectable } from '@nestjs/common';
import { UpdateActivityDto } from './dto/update-activity.dto';
import {PrismaService} from "../prisma/prisma.service";
import {CreateActivityDto} from "./dto/create-activity.dto";
import {Activities} from "@prisma/client";

@Injectable()
export class ActivitiesService {
  constructor(private prisma: PrismaService) {
  }

  async create(createActivityDto: CreateActivityDto): Promise<Activities> {
    return this.prisma.activities.create({data: createActivityDto});
  }

  async findAll() {
    return this.prisma.activities.findMany();
  }

  async findOne(id: number) {
    return this.prisma.activities.findUnique({where: {id}});
  }

  async update(id: number, updateActivityDto: UpdateActivityDto) {
    return this.prisma.activities.update({where: {id}, data: updateActivityDto});
  }

  async remove(id: number) {
    return this.prisma.activities.delete({where: {id}});
  }
}
