import { Prisma, PajamaSize } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { PijamaSizeRepository } from "../pijamaSize-repository";

export class PrismaPijamaSizeRepository implements PijamaSizeRepository {
    async createSizes(data: any) { // FAZER DEPOIS!!!!
        const pajamas = await prisma.pajamaSize.createMany({
            data
        });
    }

    async updateSize(pajamaId: string, size: PajamaSize) {
        await prisma.pajamaSize.update({
            where: { id: pajamaId },
            data: { stock_quantity: size.stock_quantity }
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
    
    async getSizes(pijamaId: string): Promise<PajamaSize[]> {
        const sizes = await prisma.pajamaSize.findMany({
            where: { pajamaId: pijamaId }
        })
        return sizes
    }
}