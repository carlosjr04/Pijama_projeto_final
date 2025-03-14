import { Prisma } from "@prisma/client";
import { PijamasRepository } from "../pijamas-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPijamasRepository implements PijamasRepository {

    async getAll(){
        const pajamas = await prisma.pajamas.findMany()

        return pajamas
    }
    

    async create(data: Prisma.PajamasCreateInput){
        const pajama = await prisma.pajamas.create({
            data
        })

        return pajama
    }

    async update(id: string, data: Prisma.PajamasUpdateInput) {
        const pajamas = await prisma.pajamas.update({
            where: {id},
            data: {
                name: data.name,
                description: data.description,
                image: data.image,
                price: data.price,
                season: data.season,
                type: data.type,
                gender: data.gender,
                favorite: data.favorite,
                on_sale: data.on_sale
            }
        })

        return pajamas
    }

    async delete(id: string) {
        await prisma.pajamas.delete ({
            where: {id}
        })
    }

    async findById(id: string) {
        const pajamas = await prisma.pajamas.findUnique ({
            where: {id}
        })

        return pajamas
    }
}