import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';
import {EventsService} from './events.service';
import {EventAnalysisService} from "./events_analysis.service";
import {CreateEventDto} from "./dto/create-event.dto";
import {UpdateEventDto} from "./dto/update-event.dto";
import {AnalyzeEventDto} from "./dto/analyze-event.dto";

@Controller('events')
export class EventsController {
    constructor(
        private readonly eventsService: EventsService,
        private readonly eventAnalysisService: EventAnalysisService,
    ) {
    }

    @Post()
    async create(@Body() createEventDto: CreateEventDto) {
        return this.eventsService.create(createEventDto);
    }

    @Get()
    async findAll() {
        return this.eventsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateEventDto: UpdateEventDto,
    ) {
        return this.eventsService.update(id, updateEventDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.eventsService.remove(id);
    }

    @Post('similar')
    async findSimilar(@Body() newEventDetails: AnalyzeEventDto) {
        return this.eventAnalysisService.analyzeSimilarity(newEventDetails);
    }
}
