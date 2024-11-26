import {Injectable} from '@nestjs/common';
import {CreateEventDto} from './dto/create-event.dto';

@Injectable()
export class EventsService {
    create(createEventDto: CreateEventDto) {
        return 'This action adds a new event';
    }

    findOne(id: number) {
        return `This action returns a #${id} event`;
    }

    findMostSimilarEvent(id: number) {
        return `This action returns a #${id} event`;
    }

    findMostPopularActivities(id: number) {
        return `This action returns a #${id} event`;
    }
}
