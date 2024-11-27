import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateActivityDto} from "./dto/create-activity.dto";
import {UpdateActivityDto} from "./dto/update-activity.dto";

@Injectable()
export class ActivitiesService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createActivityDto: CreateActivityDto) {
        const {eventId, name, description, capacity} = createActivityDto;

        // Check if the associated event exists
        const event = await this.prisma.event.findUnique({
            where: {id: eventId},
        });
        if (!event) {
            throw new NotFoundException(`Event with ID ${eventId} not found`);
        }

        // Create the activity
        return this.prisma.activity.create({
            data: {
                name,
                description,
                capacity,
                eventId,
            },
        });
    }

    async findAll(eventId: number) {
        // Find all activities for a specific event
        return this.prisma.activity.findMany({
            where: {eventId},
            include: {registrations: true},
        });
    }

    async findOne(id: number) {
        // Find a specific activity
        const activity = await this.prisma.activity.findUnique({
            where: {id},
            include: {event: true, registrations: true},
        });
        if (!activity) {
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }
        return activity;
    }

    async update(id: number, updateActivityDto: UpdateActivityDto) {
        // Check if the activity exists
        const activity = await this.prisma.activity.findUnique({where: {id}});
        if (!activity) {
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }

        // Update the activity
        return this.prisma.activity.update({
            where: {id},
            data: updateActivityDto,
        });
    }

    async remove(id: number) {
        // Check if the activity exists
        const activity = await this.prisma.activity.findUnique({where: {id}});
        if (!activity) {
            throw new NotFoundException(`Activity with ID ${id} not found`);
        }

        // Delete the activity
        return this.prisma.activity.delete({where: {id}});
    }
}
