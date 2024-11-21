// export class CreateEventDto {}
import {User} from "@prisma/client";

export type LoginAuthDto = Omit<User, 'id' | 'role' | 'createdAt' | 'updatedAt'>;
