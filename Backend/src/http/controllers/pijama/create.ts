import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
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
            on_sale: z.boolean()
        })
    
        const { name, description, image, price, season, type, gender, favorite, on_sale } = registerBodySchema.parse(request.body)

    try {

        const prismaPijamaRepository = new PrismaPijamasRepository()
        const registerUseCase = new CreateUseCase(prismaPijamaRepository)

        const { pijama } = await registerUseCase.execute({
          name,
          description,
          image,
          price,
          season,
          type,
          gender,
          favorite,
          on_sale
        })

        return reply.status(201).send(pijama)

    }catch (err) {
        throw err
    }
}