import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { DeleteUserUseCase } from "@/use-cases/delete-user-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        userId: z.string().uuid()
    })

    const { userId } = getParamsSchema.parse(request.params)

    try {

        const prismaUsersrepository = new PrismaUsersRepository()
        const deleteUserUseCase = new DeleteUserUseCase(prismaUsersrepository)

        const user = await deleteUserUseCase.execute({
            userId
        })

        return reply.status(204).send()
        
    } catch (err) {
        
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}