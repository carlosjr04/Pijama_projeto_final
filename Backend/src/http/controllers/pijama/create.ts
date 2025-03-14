import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { PrismaPijamaSizeRepository } from "@/repositories/prisma/prisma-pijamaSize-repository";
import { CreateUseCase } from "@/use-cases/pijamas/create-pijama-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            image: z.string(),
            price: z.number(),
            season: z.string(),
            type: z.string(),
            gender: z.string(),
            favorite: z.boolean(),
            on_sale: z.boolean(),
            sale_percent: z.number().optional()
        })
    
        const { name, description, image, price, season, type, gender, favorite, on_sale, sale_percent } = registerBodySchema.parse(request.body)

    try {

        const prismaPijamaRepository = new PrismaPijamasRepository()
        const prismaPijamaSizeRepository = new PrismaPijamaSizeRepository()
        const createUseCase = new CreateUseCase(prismaPijamaRepository, prismaPijamaSizeRepository)

        const { pijama } = await createUseCase.execute({
          name,
          description,
          image,
          price,
          season,
          type,
          gender,
          favorite,
          on_sale,
          sale_percent
        })

        return reply.status(201).send(pijama)

    }catch (err) {
        throw err
    }
}