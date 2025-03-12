import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaSale_PajamasRepository } from "@/repositories/prisma/prisma-sale_pajamas-repository";
import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { GetSaleUseCase } from "@/use-cases/get-sale-use-case";
import { GetSale_PajamasUseCase } from "@/use-cases/get-sale_pajamas-use-case";
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
        const prismasale_PajamasRepository = new PrismaSale_PajamasRepository()

        const getSaleUseCase = new GetSaleUseCase(prismaSalesRepository, prismaAddressRepository)
        const getSale_PajamasUseCase = new GetSale_PajamasUseCase(prismasale_PajamasRepository)

        const { sale, address } = await getSaleUseCase.execute({
            saleId
        })

        const response = await getSale_PajamasUseCase.execute({
            saleId
        })

        let totalQuantity:number = 0
        let totalPrice:number = 0

        for (const sale_pajama of response.sales_pajamas){
            totalQuantity += sale_pajama.quantity
            totalPrice += sale_pajama.price
        }

        return await reply.status(200).send({sale, address, totalQuantity, totalPrice})
        
    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return await reply.status(404).send({message: err.message})
        }

        throw err
    }
}