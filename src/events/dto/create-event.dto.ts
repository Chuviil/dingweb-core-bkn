// export class CreateEventDto {}
import {Events} from "@prisma/client";

export type CreateEventDto = Omit<Events, 'id'>;