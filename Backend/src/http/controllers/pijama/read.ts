import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { ReadPijamaUseCase } from "@/use-cases/pijamas/read-pijama-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function get(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        pijamaId: z.string().uuid()
    })

    const { pijamaId } = getParamsSchema.parse(request.params)

    try {

        const prismaPijamaRepository = new PrismaPijamasRepository()
        const getPijamaUseCase = new ReadPijamaUseCase(prismaPijamaRepository)

        const { pijama } = await getPijamaUseCase.execute({
            pijamaId
        })

        return reply.status(200).send(pijama)
        
    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}