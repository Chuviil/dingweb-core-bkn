import {Injectable} from '@nestjs/common';
import {CreateActivityDto} from './dto/create-activity.dto';

@Injectable()
export class ActivitiesService {
    create(createActivityDto: CreateActivityDto) {
        return 'This action adds a new activity';
    }

    findOne(id: number) {
        return `This action returns a #${id} activity`;
    }
}
