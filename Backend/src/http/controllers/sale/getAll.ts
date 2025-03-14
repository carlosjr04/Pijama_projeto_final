import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { GetAllSalesUseCase } from "@/use-cases/sales/get-all-sales-use-case";
import { FastifyReply, FastifyRequest } from "fastify";

export async function getAll(request: FastifyRequest, reply: FastifyReply) {
    
try {
    const prismaSalesRepository = new PrismaSalesRepository()
    const getAllSalesUseCase = new GetAllSalesUseCase(prismaSalesRepository)

    const { sales } = await getAllSalesUseCase.execute()

    return await reply.status(200).send(sales)

} catch (err) {
    if (err instanceof ResourceNotFoundError){
        return reply.status(404).send({message: err.message})
    }
    throw err
}
}