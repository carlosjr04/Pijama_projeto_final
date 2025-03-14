import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { GetAllUsersUseCase } from "@/use-cases/users/get-all-users-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    
try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const getAllUsersUseCase = new GetAllUsersUseCase(prismaUsersRepository)

    const { users } = await getAllUsersUseCase.execute()

    return await reply.status(200).send(users)
    
} catch (err) {
    if (err instanceof ResourceNotFoundError){
        return reply.status(404).send({message: err.message})
    }
    throw err
}
}