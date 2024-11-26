import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateEventDto} from "./dto/create-event.dto";
import {UpdateEventDto} from "./dto/update-event.dto";

@Injectable()
export class EventsService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createEventDto: CreateEventDto) {
        const {title, description, date, location, locationLat, locationLon, tags, organizerId} = createEventDto;

        // Create the event with optional tags and organizer
        return this.prisma.event.create({
            data: {
                title,
                description,
                date,
                location,
                locationLat,
                locationLon,
                organizer: organizerId ? {connect: {id: organizerId}} : undefined,
                tags: {
                    connectOrCreate: tags.map((tag) => ({
                        where: {name: tag},
                        create: {name: tag},
                    })),
                },
            },
            include: {tags: true},
        });
    }

    async findAll() {
        // Retrieve all events with their tags and organizer information
        return this.prisma.event.findMany({
            include: {
                tags: true,
                organizer: true,
                activities: true,
            },
        });
    }

    async findOne(id: number) {
        // Retrieve a specific event by ID
        const event = await this.prisma.event.findUnique({
            where: {id},
            include: {
                tags: true,
                organizer: true,
                activities: true,
                registrations: true,
            },
        });
        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }
        return event;
    }

    async update(id: number, updateEventDto: UpdateEventDto) {
        const {tags, ...data} = updateEventDto;

        // Check if the event exists
        const event = await this.prisma.event.findUnique({where: {id}});
        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }

        // Update the event and its tags if provided
        return this.prisma.event.update({
            where: {id},
            data: {
                ...data,
                tags: tags
                    ? {
                        connectOrCreate: tags.map((tag) => ({
                            where: {name: tag},
                            create: {name: tag},
                        })),
                    }
                    : undefined,
            },
            include: {tags: true},
        });
    }

    async remove(id: number) {
        // Check if the event exists
        const event = await this.prisma.event.findUnique({where: {id}});
        if (!event) {
            throw new NotFoundException(`Event with ID ${id} not found`);
        }

        // Delete the event
        return this.prisma.event.delete({where: {id}});
    }
}
