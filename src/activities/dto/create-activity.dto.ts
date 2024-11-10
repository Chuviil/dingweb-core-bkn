// export class CreateEventDto {}

import {Activities} from "@prisma/client";

export type CreateActivityDto = Omit<Activities, 'id'>;