import { PrismaPijamasRepository } from "@/repositories/prisma/prisma-pijamas-repository";
import { PrismaPijamaSizeRepository } from "@/repositories/prisma/prisma-pijamaSize-repository";
import { CreateManyPajamasUseCase } from "@/use-cases/pijamas/create-many-pajamas-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function createMany(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.array(z.object({
        name: z.string(),
        description: z.string(),
        image: z.string(),
        price: z.number(),
        season: z.enum(["Verão", "Inverno", "Todos"]),
        type: z.enum(["Todos", "Adulto", "Infantil"]),
        gender: z.enum(["Todos", "Unisex", "Masculino", "Feminino", "Família"]),
        favorite: z.boolean(),
        on_sale: z.boolean(),
    }))

    const pajamas = registerBodySchema.parse(request.body)

    const prismaPajamasRepository = new PrismaPijamasRepository()
    const prismaPajamaSizeRepository = new PrismaPijamaSizeRepository()

    const createManyPajamasUseCase = new CreateManyPajamasUseCase(prismaPajamasRepository, prismaPajamaSizeRepository)

    await createManyPajamasUseCase.execute({
        pajamas
    })


}