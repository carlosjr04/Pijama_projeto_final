import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({
            data
        })

        return user
    }

    async update(id: string, data: Prisma.UserUpdateInput) {
        const user = await prisma.user.update({
            where: {id},
            data: {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password
            }
        })

        return user
    }

    async delete(id: string) {
        const user = await prisma.user.delete ({
            where: {id}
        })

        return user
    }

    async findById(id: string) {
        const user = await prisma.user.findUnique ({
            where: {id}
        })

        return user
    }
    
}