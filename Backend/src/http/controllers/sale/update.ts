import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { UpdateSaleUseCase } from "@/use-cases/update-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamSchema = z.object({
        saleId: z.string().uuid()
    })

    const updateBodySchema = z.object({
        buyer_name: z.string().optional(),
        cpf: z.string().optional(),
        price: z.number().optional(),
        payment_method: z.enum(["Debit Card", "Credit Card", "Pix"]).optional(),
        installments: z.number().optional(),
        card_number: z.string().optional(),
        zip_code: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        neighborhood: z.string().optional(),
        address: z.string().optional(),
        number: z.string().optional()
    })

    const { saleId } = updateParamSchema.parse(request.params)
    const { buyer_name, cpf, price, payment_method, installments, card_number, zip_code, state, city, neighborhood, address, number } = updateBodySchema.parse(request.body)

    try {

        const prismaSalesRepository = new PrismaSalesRepository()
        const prismaAddressRepository = new PrismaAddressRepository()

        const updateSaleUseCase = new UpdateSaleUseCase(prismaSalesRepository, prismaAddressRepository)

        const { sale } = await updateSaleUseCase.execute({
            saleId,

            saleData: {
                buyer_name, 
                cpf, 
                price, 
                payment_method, 
                installments, 
                card_number,
            },

            addressData: {
                zip_code, 
                state, 
                city, 
                address, 
                neighborhood, 
                number
            }
        })

        return await reply.status(200).send(sale)
        
    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return await reply.status(404).send({message: err.message})
        }

        throw err
    }
}
