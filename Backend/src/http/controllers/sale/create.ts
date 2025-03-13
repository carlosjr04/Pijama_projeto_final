import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { PrismaPijamaSizeRepository } from "@/repositories/prisma/prisma-pijamaSize-repository";
import { PrismaSale_PajamasRepository } from "@/repositories/prisma/prisma-sale_pajamas-repository";
import { PrismaSalesRepository } from "@/repositories/prisma/prisma-sales-repository";
import { CreateSalePajamasUseCase } from "@/use-cases/sale_pajamas/create-sale_pajamas-use-case";
import { CreateSaleUseCase } from "@/use-cases/sales/create-sale-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply){
    const createBodySchema = z.object({
        buyer_name: z.string(),
        cpf: z.string(),
        price: z.number(),
        payment_method: z.enum(["Debit Card", "Credit Card", "Pix"]),
        installments: z.number().optional(),
        card_number: z.string().optional(),
        zip_code: z.string(),
        state: z.string(),
        city: z.string(),
        neighborhood: z.string(),
        address: z.string(),
        number: z.string(),


        pajamas: z.array(z.object({
            pajamaId: z.string(),
            quantity: z.number().int().nonnegative(),
            size: z.enum(["PP", "P", "M", "G", "GG"])
        }))

    })

    const { 
        buyer_name,
        cpf,
        price, 
        payment_method,
        installments, 
        card_number, 
        zip_code, 
        state, 
        city, 
        neighborhood, 
        address, 
        number,
        
        pajamas

    } = createBodySchema.parse(request.body)

    try {

        const prismaSalesRepository = new PrismaSalesRepository()
        const prismaAddressRepository = new PrismaAddressRepository()
        const prismaPajamasRepository = new PrismaPijamasRepository()
        const prismaSales_PajamasRepository = new PrismaSale_PajamasRepository()
        const prismaPajamaSizeRepository = new PrismaPijamaSizeRepository

        const createSaleUseCase = new CreateSaleUseCase(
            prismaSalesRepository, 
            prismaAddressRepository,
            prismaPajamasRepository,
            prismaPajamaSizeRepository
        )
        const createSalePajamasUseCase = new CreateSalePajamasUseCase(prismaSales_PajamasRepository, prismaPajamasRepository, prismaPajamaSizeRepository)


        const { sale } = await createSaleUseCase.execute(
            {
                buyer_name, 
                cpf, 
                price, 
                payment_method, 
                installments, 
                card_number,
                
                zip_code, 
                state, 
                city, 
                address, 
                neighborhood, 
                number,

                pajamas
            }
        )


        await createSalePajamasUseCase.execute({
            pajamas,
            saleId: sale.id
        })


        return await reply.status(201).send(sale)
        
    } catch (err) {
        throw err
    }
}