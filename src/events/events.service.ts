import {Injectable} from '@nestjs/common';
import {CreateEventDto} from './dto/create-event.dto';
import {UpdateEventDto} from './dto/update-event.dto';
import {PrismaService} from "../prisma/prisma.service";
import {Events, Prisma} from "@prisma/client";
import {OpenaiService} from "../openai/openai.service";

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService, private openaiembeddings: OpenaiService) {
    }

    async create(createEventDto: CreateEventDto): Promise<Events> {
        const { title, description, start_date, end_date } = createEventDto;

        const embeddings = await this.openaiembeddings.embedQuery(`${title} ${description}`) as unknown as string;

        const result = await this.prisma.$queryRaw`
    INSERT INTO "Events" (title, description, start_date, end_date, embeddings)
    VALUES (${title}, ${description}, ${new Date(start_date)}, ${new Date(end_date)}, ${embeddings}::vector)
    RETURNING id, title, description, start_date, end_date;`;
        return result[0] as Events;
    }

    async findAll(): Promise<Events[]> {
        return this.prisma.events.findMany();
    }

    async findOne(id: number): Promise<Events> {
        return this.prisma.events.findUnique({where: {id}})
    }

    async update(id: number, updateEventDto: UpdateEventDto) {
        return this.prisma.events.update({where: {id}, data: updateEventDto});
    }

    async remove(id: number) {
        return this.prisma.events.delete({where: {id}});
    }
}
