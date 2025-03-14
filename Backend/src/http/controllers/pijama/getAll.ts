import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { GetAllPajamasUseCase } from "@/use-cases/pijamas/get-all-pajamas-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    
try {
    const prismaPajamasRepository = new PrismaPijamasRepository()
    const getAllPajamasUseCase = new GetAllPajamasUseCase(prismaPajamasRepository)

    const { pajamas } = await getAllPajamasUseCase.execute()

    return await reply.status(200).send(pajamas)

} catch (err) {
    if (err instanceof ResourceNotFoundError){
        return reply.status(404).send({message: err.message})
    }
    throw err
}

}