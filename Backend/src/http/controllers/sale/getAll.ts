import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { GetAllSalesUseCase } from "@/use-cases/sales/get-all-sales-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    
    const prismaSalesRepository = new PrismaSalesRepository()
    const getAllSalesUseCase = new GetAllSalesUseCase(prismaSalesRepository)

    const { sales } = await getAllSalesUseCase.execute()

    return await reply.status(200).send(sales)
}