import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateRegistrationDto} from "./dto/create-registration.dto";
import {UpdateRegistrationDto} from "./dto/update-registration.dto";

@Injectable()
export class RegistrationsService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createRegistrationDto: CreateRegistrationDto) {
        const {userId, eventId, activityId} = createRegistrationDto;

        // Ensure the user exists
        const user = await this.prisma.user.findUnique({where: {id: userId}});
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Ensure the event exists if specified
        if (eventId) {
            const event = await this.prisma.event.findUnique({where: {id: eventId}});
            if (!event) {
                throw new NotFoundException(`Event with ID ${eventId} not found`);
            }
        }

        // Ensure the activity exists if specified
        if (activityId) {
            const activity = await this.prisma.activity.findUnique({where: {id: activityId}});
            if (!activity) {
                throw new NotFoundException(`Activity with ID ${activityId} not found`);
            }
        }

        // Create the registration
        return this.prisma.registration.create({
            data: {
                userId,
                eventId,
                activityId,
            },
            include: {
                user: true,
                event: true,
                activity: true,
            },
        });
    }

    async findAll() {
        // Retrieve all registrations with user, event, and activity details
        return this.prisma.registration.findMany({
            include: {
                user: true,
                event: true,
                activity: true,
            },
        });
    }

    async findOne(id: number) {
        // Retrieve a specific registration by ID
        const registration = await this.prisma.registration.findUnique({
            where: {id},
            include: {
                user: true,
                event: true,
                activity: true,
            },
        });
        if (!registration) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }
        return registration;
    }

    async update(id: number, updateRegistrationDto: UpdateRegistrationDto) {
        const {userId, eventId, activityId} = updateRegistrationDto;

        // Check if the registration exists
        const registration = await this.prisma.registration.findUnique({where: {id}});
        if (!registration) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }

        // Update the registration
        return this.prisma.registration.update({
            where: {id},
            data: {
                userId,
                eventId,
                activityId,
            },
            include: {
                user: true,
                event: true,
                activity: true,
            },
        });
    }

    async remove(id: number) {
        // Check if the registration exists
        const registration = await this.prisma.registration.findUnique({where: {id}});
        if (!registration) {
            throw new NotFoundException(`Registration with ID ${id} not found`);
        }

        // Delete the registration
        return this.prisma.registration.delete({where: {id}});
    }
}
