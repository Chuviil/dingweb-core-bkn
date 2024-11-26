import {Injectable} from '@nestjs/common';
import {CreateRegistrationDto} from './dto/create-registration.dto';

@Injectable()
export class RegistrationsService {
    create(createRegistrationDto: CreateRegistrationDto) {
        return 'This action adds a new registration';
    }

    findOne(id: number) {
        return `This action returns a #${id} registration`;
    }
}
