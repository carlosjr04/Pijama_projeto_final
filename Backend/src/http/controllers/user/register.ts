import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { UserAlreadyExists } from "@/use-cases/errors/user-already-exists-error";
import { RegisterUseCase } from "@/use-cases/register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
        name: z.string(),
        username: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const {name, username, email, password} = registerBodySchema.parse(request.body)

    try {

        const prismaUsersRepository = new PrismaUsersRepository()
        const registerUseCase = new RegisterUseCase(prismaUsersRepository)

        const { user } = await registerUseCase.execute({
            name,
            username,
            email,
            password
        })

        return reply.status(201).send(user)

    }catch (err) {
        if (err instanceof UserAlreadyExists){
            return reply.status(409).send({message: err.message})
        }
        throw err
    }
}