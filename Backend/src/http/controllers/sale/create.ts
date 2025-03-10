import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { CreateSaleUseCase } from "@/use-cases/create-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply){
    const registerSaleBodySchema = z.object({
        buyer_name: z.string(),
        cpf: z.string(),
        price: z.number(),
        payment_method: z.string(),
        installments: z.number().optional(),
        card_number: z.string().optional()

    })

    const registerAddressBodySchema = z.object({
        zip_code: z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        address: z.string(),
        number: z.string()
    })

    const { buyer_name, cpf, price, payment_method, installments, card_number } = registerSaleBodySchema.parse(request.body)
    const { zip_code, state, city, neighborhood, address, number } = registerAddressBodySchema.parse(request.body)

    try {

        const prismaSalesRepository = new PrismaSalesRepository()
        const prismaAddressRepository = new PrismaAddressRepository()

        const createSaleUseCase = new CreateSaleUseCase(prismaSalesRepository, prismaAddressRepository)

        const { sale } = await createSaleUseCase.execute(
            {
                buyer_name, 
                cpf, 
                price, 
                payment_method, 
                installments, 
                card_number
            },

            {
                zip_code, 
                state, 
                city, 
                address, 
                neighborhood, 
                number
            }
        )

        return await reply.status(201).send(sale)
        
    } catch (err) {
        throw err
    }
}