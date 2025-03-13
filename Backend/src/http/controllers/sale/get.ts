import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { GetSaleUseCase } from "@/use-cases/get-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function get(request: FastifyRequest, reply:FastifyReply) {
    const getParamsSchema = z.object({
        saleId: z.string().uuid()
    })

    const { saleId } = getParamsSchema.parse(request.params)

    try {

        const prismaSalesRepository = new PrismaSalesRepository()
        const prismaAddressRepository = new PrismaAddressRepository()

        const getSaleUseCase = new GetSaleUseCase(prismaSalesRepository, prismaAddressRepository)

        const { sale, address } = await getSaleUseCase.execute({
            saleId
        })

        return await reply.status(200).send({sale, address})
        
    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return await reply.status(404).send({message: err.message})
        }

        throw err
    }
}