import { Prisma, Sale_Pajamas } from "@prisma/client";
import { Sale_pajamasRepository } from "../sale_pajamas-repository";
import { prisma } from "@/lib/prisma";

export class PrismaSale_PajamasRepository implements Sale_pajamasRepository {

    async getBySaleId(saleId: string) {
        const sale_Pajamas = await prisma.sale_Pajamas.findMany({
            where: { saleId }
        })

        return sale_Pajamas
    }

    async createMany(data: Prisma.Sale_PajamasCreateManyInput[]) {
        await prisma.sale_Pajamas.createMany({
            data
        })
    }

    async findById(id: string) {
        const sale_Pajamas = await prisma.sale_Pajamas.findUnique({
            where: { id }
        })

        return sale_Pajamas
    }
}