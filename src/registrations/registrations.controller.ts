import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RegistrationsService} from './registrations.service';
import {CreateRegistrationDto} from './dto/create-registration.dto';

@Controller('registrations')
export class RegistrationsController {
    constructor(private readonly registrationsService: RegistrationsService) {
    }

    @Post()
    create(@Body() createRegistrationDto: CreateRegistrationDto) {
        return this.registrationsService.create(createRegistrationDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.registrationsService.findOne(+id);
    }
}
