import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post,} from '@nestjs/common';
import {RegistrationsService} from './registrations.service';
import {CreateRegistrationDto} from "./dto/create-registration.dto";
import {UpdateRegistrationDto} from "./dto/update-registration.dto";

@Controller('registrations')
export class RegistrationsController {
    constructor(private readonly registrationsService: RegistrationsService) {
    }

    @Post()
    async create(@Body() createRegistrationDto: CreateRegistrationDto) {
        return this.registrationsService.create(createRegistrationDto);
    }

    @Get()
    async findAll() {
        return this.registrationsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.registrationsService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateRegistrationDto: UpdateRegistrationDto,
    ) {
        return this.registrationsService.update(id, updateRegistrationDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return this.registrationsService.remove(id);
    }
}
