import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ActivitiesService} from './activities.service';
import {CreateActivityDto} from './dto/create-activity.dto';

@Controller('activities')
export class ActivitiesController {
    constructor(private readonly activitiesService: ActivitiesService) {
    }

    @Post()
    create(@Body() createActivityDto: CreateActivityDto) {
        return this.activitiesService.create(createActivityDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.activitiesService.findOne(+id);
    }
}
