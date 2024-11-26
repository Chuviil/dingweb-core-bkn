import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {EventsService} from './events.service';
import {CreateEventDto} from './dto/create-event.dto';
import {EventAnalysisService} from "./events_analysis.service";
import {AnalyzeEventDto} from "./dto/analyze-event.dto";

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService, private readonly eventAnalysisService: EventAnalysisService) {
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
    findMostSimilarEvent(@Body() analyzeEventDto: AnalyzeEventDto) {
        return this.eventAnalysisService.analyzeSimilarity(analyzeEventDto);
    }
}
