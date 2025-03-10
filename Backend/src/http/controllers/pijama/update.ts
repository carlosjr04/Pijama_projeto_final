import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { UpdatePijamaUseCase } from "@/use-cases/pijamas/update-pijama-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply) {
    const updateParamSchema = z.object({
        pijamaId: z.string().uuid()
    })

    const updateBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        image: z.string().optional(),
        price: z.number().optional(),
        season: z.string().optional(),
        type: z.string().optional(),
        gender: z.string().optional(),
        favorite: z.boolean().optional(),
        on_sale: z.boolean().optional()
    })

    const { pijamaId } = updateParamSchema.parse(request.params)
    const { name, description, image, price, season, type, gender, favorite, on_sale } = updateBodySchema.parse(request.body)

    try {
        
        const prismaPijamasRepository = new PrismaPijamasRepository()
        const updatePijamaUseCase = new UpdatePijamaUseCase(prismaPijamasRepository)

        const pijama = await updatePijamaUseCase.execute({
            pijamaId,
            data: {
                name,
                description,
                image,
                price,
                season,
                type,
                gender,
                favorite,
                on_sale
            }
        })

        return reply.status(200).send({ pijama })

    } catch (err) {
        if (err instanceof ResourceNotFoundError){
            return reply.status(404).send({message: err.message})
        }
        throw err
    }
}