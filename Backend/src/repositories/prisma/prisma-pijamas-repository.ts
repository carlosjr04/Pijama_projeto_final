import { Prisma, User, PajamaSize } from "@prisma/client";
import { PijamasRepository } from "../pijamas-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPijamasRepository implements PijamasRepository {

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
        const pajamas = await prisma.pajamas.delete ({
            where: {id}
        })
    }

    async findById(id: string) {
        const pajamas = await prisma.pajamas.findUnique ({
            where: {id}
        })

        return pajamas
    }

    //adição os métodos de criação pajamasizeby

    async createSizes(data: Prisma.PajamaSizeCreateManyInput[]) {
        await prisma.pajamaSize.createMany({
            data
        });

        const pajamas = await prisma.pajamaSize.findMany({
            where: { 
                pajamaId: { in: data.map(d => d.pajamaId) }
             }
        })

        return pajamas
    }

    async updateSize(pajamaId: string, size: PajamaSize) {
        await prisma.pajamaSize.update({
            where: { id: pajamaId },
            data: { stock_quantity: size.stock_quantity }
        })
    }

    async updateSizes(pijamaId: string, sizes: PajamaSize[]): Promise<void> {
        // Atualiza os tamanhos com base no pijamaId
        await prisma.pajamaSize.updateMany({
            where: { pajamaId: pijamaId },
            data: sizes.map(size => ({ stock_quantity: size.stock_quantity }))
        });
    }

    async deleteSizes(pijamaId: string): Promise<void> {
        // Deleta os tamanhos associados ao pijama
        await prisma.pajamaSize.deleteMany({
            where: { pajamaId: pijamaId }
        });
    }

    async getSize(pajamaId: string, size: string): Promise<PajamaSize | null> {
        const pajamaSize = await prisma.pajamaSize.findFirst({
            where: {
                pajamaId,
                size
            }
        })

        return pajamaSize
    }
    
    async getSizes(pijamaId: string): Promise<PajamaSize[]> {
        const sizes = await prisma.pajamaSize.findMany({
            where: { pajamaId: pijamaId }
        })
        return sizes
    }
}