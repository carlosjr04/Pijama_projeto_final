import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { GetAllPajamasUseCase } from "@/use-cases/pijamas/get-all-pajamas-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    
    const prismaPajamasRepository = new PrismaPijamasRepository()
    const getAllPajamasUseCase = new GetAllPajamasUseCase(prismaPajamasRepository)

    const { pajamas } = await getAllPajamasUseCase.execute()

    return pajamas
}