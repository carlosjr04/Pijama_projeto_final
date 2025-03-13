import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { PrismaPijamaSizeRepository } from "@/repositories/prisma/prisma-pijamaSize-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { ReadPijamaUseCase } from "@/use-cases/pijamas/read-pijama-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function read(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        pijamaId: z.string().uuid()
    })

    const { pijamaId } = getParamsSchema.parse(request.params)

    try {

        const prismaPijamaRepository = new PrismaPijamasRepository()
        const pijamaSizeRepository = new PrismaPijamaSizeRepository()
        const getPijamaUseCase = new ReadPijamaUseCase(prismaPijamaRepository, pijamaSizeRepository)

        const { pijama, sizes } = await getPijamaUseCase.execute({
            pijamaId
        })

        return reply.status(200).send({ pijama, sizes })
        
    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}