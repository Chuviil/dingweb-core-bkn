import {Module} from '@nestjs/common';
import {PrismaService} from './prisma/prisma.service';
import {PrismaModule} from './prisma/prisma.module';
import {OpenaiService} from './openai/openai.service';
import {OpenaiModule} from './openai/openai.module';

@Module({
    imports: [PrismaModule, OpenaiModule],
    controllers: [],
    providers: [PrismaService, OpenaiService],
})
export class AppModule {
}
