import { Prisma, Sale } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { SalesRepository } from "../sales-repository";

export class PrismaSalesRepository implements SalesRepository {
    async create(data: Prisma.SaleCreateInput) {
        const sale = await prisma.sale.create({
            data
        })

        return sale
    }

}