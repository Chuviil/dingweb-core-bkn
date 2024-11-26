import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {EventsService} from './events.service';
import {CreateEventDto} from './dto/create-event.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }

    @Post()
    create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.eventsService.findOne(+id);
    }

    @Get('similar')
    findMostSimilarEvent(@Param('id') id: string) {
        return this.eventsService.findMostSimilarEvent(+id);
    }

    @Get('popular-activities')
    findMostPopularActivities(@Param('id') id: string) {
        return this.eventsService.findMostPopularActivities(+id);
    }
}
