import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { PrismaSale_PajamasRepository } from "@/repositories/prisma/prisma-sale_pajamas-repository";
import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { UpdateSale_PajamasUseCase } from "@/use-cases/sale_pajamas/update-sale_pajamas-use-case";
import { UpdateSaleUseCase } from "@/use-cases/sales/update-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamSchema = z.object({
        saleId: z.string().uuid()
    })

    const updateBodySchema = z.object({
        buyer_name: z.string().optional(),
        cpf: z.string().optional(),
        payment_method: z.enum(["Debit Card", "Credit Card", "Pix"]).optional(),
        installments: z.number().optional(),
        card_number: z.string().optional(),
        zip_code: z.string().optional(),
        state: z.string().optional(),
        city: z.string().optional(),
        neighborhood: z.string().optional(),
        address: z.string().optional(),
        number: z.string().optional(),

        sale_pajamaId:  z.string().optional(),
        quantity: z.number().nonnegative().optional()
    })

    const { saleId } = updateParamSchema.parse(request.params)
    const { 
            buyer_name,
            cpf,
            payment_method,  
            installments,
            card_number, 
            zip_code, 
            state, 
            city, 
            neighborhood, 
            address, 
            number,

            sale_pajamaId,
            quantity

        } = updateBodySchema.parse(request.body)

    try {

        const prismaSalesRepository = new PrismaSalesRepository()
        const prismaAddressRepository = new PrismaAddressRepository()

        const prismaSale_PajamasRepository = new PrismaSale_PajamasRepository()
        const prismaPajamasRepository = new PrismaPijamasRepository()

        const updateSaleUseCase = new UpdateSaleUseCase(prismaSalesRepository, prismaAddressRepository)
        const updateSale_PajamasUseCase = new UpdateSale_PajamasUseCase(prismaSale_PajamasRepository, prismaPajamasRepository, prismaSalesRepository)

        const { sale } = await updateSaleUseCase.execute({
            saleId,

            saleData: {
                buyer_name, 
                cpf, 
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

        if (!sale){
            throw new ResourceNotFoundError()
        }

        if (quantity && !sale_pajamaId){
            throw new ResourceNotFoundError()
        }

        if (sale_pajamaId){
            const { sale_pajama } = await updateSale_PajamasUseCase.execute({
                sale,
                sale_pajamaId,
                data: { quantity }
            })

            return await reply.status(200).send({sale, sale_pajama})
        }

        const sale_pajamas = await prismaSale_PajamasRepository.getBySaleId(sale.id)
        if (!sale_pajamas){
            throw new ResourceNotFoundError()
        }

        let totalPrice:number = 0

        for (const element of sale_pajamas){
            totalPrice += element.price
        }

        sale.price = totalPrice

        return await reply.status(200).send(sale)
        
    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return await reply.status(404).send({message: err.message})
        }

        throw err
    }
}
