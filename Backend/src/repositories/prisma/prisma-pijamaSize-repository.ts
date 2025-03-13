import { Prisma, PajamaSize } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PijamaSizeRepository } from "../pijamaSize-repository";

export class PrismaPijamaSizeRepository implements PijamaSizeRepository {
    async createSizes(data: any) { // FAZER DEPOIS!!!!
        const pajamas = await prisma.pajamaSize.createMany({
            data
        });
    }

    async updateSize(pajamaId: string, pajamaSize: PajamaSize) {
        await prisma.pajamaSize.update({
            where: { pajamaId_size: {
                pajamaId,
                size: pajamaSize.size
            } },
            data: { stock_quantity: pajamaSize.stock_quantity }
        })
    }

    async updateSizes(pijamaId: string, sizes: PajamaSize[]): Promise<void> {
        await prisma.pajamaSize.updateMany({
            where: { pajamaId: pijamaId },
            data: sizes.map(size => ({ stock_quantity: size.stock_quantity }))
        });
    }

    async deleteSizes(pijamaId: string): Promise<void> {
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