import { Prisma, Sale } from "@prisma/client";

export interface SalesRepository {
    create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>
}