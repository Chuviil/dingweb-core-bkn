import {Injectable} from '@nestjs/common';
import {OpenAIEmbeddings} from "@langchain/openai";

@Injectable()
export class OpenaiService extends OpenAIEmbeddings {
    constructor() {
        super({model: "text-embedding-3-small"});
    }
}
