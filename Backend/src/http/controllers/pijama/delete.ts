import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { DeletePijamaUseCase } from "@/use-cases/pijamas/delete-pijama-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deletePijama(request: FastifyRequest, reply: FastifyReply) {
    const getParamsSchema = z.object({
        pijamaId: z.string().uuid()
    })

    const { pijamaId } = getParamsSchema.parse(request.params)

    try {

        const prismaPijamarepository = new PrismaPijamasRepository()
        const deletePijamaUseCase = new DeletePijamaUseCase(prismaPijamarepository)

        const pijama = await deletePijamaUseCase.execute({
            pijamaId
        })

        return reply.status(204).send(pijama)
        
    } catch (err) {
        
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}