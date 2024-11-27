import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query,} from '@nestjs/common';
import {ActivitiesService} from './activities.service';
import {CreateActivityDto} from "./dto/create-activity.dto";
import {UpdateActivityDto} from "./dto/update-activity.dto";

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {
    }

    @Post()
    async create(@Body() createActivityDto: CreateActivityDto) {
        return this.activitiesService.create(createActivityDto);
    }

    @Get()
    async findAll(@Query('eventId', ParseIntPipe) eventId: number) {
        return this.activitiesService.findAll(eventId);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.activitiesService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateActivityDto: UpdateActivityDto,
    ) {
        return this.activitiesService.update(id, updateActivityDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.activitiesService.remove(id);
    }
}
