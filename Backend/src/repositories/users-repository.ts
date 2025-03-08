import { Prisma, User } from ".prisma/client";

export interface UserUpdateInput {
    name?: string,
    username?: string,
    email?: string,
    password?: string
}

export interface UsersRepository {
    create(data:Prisma.UserCreateInput): Promise<User>
    update(id: string, data: Prisma.UserUpdateInput): Promise<User | null>
    delete(id: string): Promise<User | null>
    findById(userId: string): Promise<User | null>

}