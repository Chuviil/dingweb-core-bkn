import {Injectable, NotFoundException} from '@nestjs/common';
import {PrismaService} from "../prisma/prisma.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createUserDto: CreateUserDto) {
        const {name, email} = createUserDto;

        // Create a new user
        return this.prisma.user.create({
            data: {
                name,
                email,
            },
        });
    }

    async findAll() {
        // Retrieve all users with their events and registrations
        return this.prisma.user.findMany({
            include: {
                events: true,
                registrations: {
                    include: {
                        event: true,
                        activity: true,
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        // Retrieve a specific user by ID
        const user = await this.prisma.user.findUnique({
            where: {id},
            include: {
                events: true,
                registrations: {
                    include: {
                        event: true,
                        activity: true,
                    },
                },
            },
        });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const {name, email} = updateUserDto;

        // Check if the user exists
        const user = await this.prisma.user.findUnique({where: {id}});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Update the user
        return this.prisma.user.update({
            where: {id},
            data: {
                name,
                email,
            },
        });
    }

    async remove(id: number) {
        // Check if the user exists
        const user = await this.prisma.user.findUnique({where: {id}});
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        // Delete the user
        return this.prisma.user.delete({
            where: {id},
        });
    }
}
