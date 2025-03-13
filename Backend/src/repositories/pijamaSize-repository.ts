import { PajamaSize } from ".prisma/client";

export interface PijamaSizeCreateInput {
    stock_quantity: Number,
    size: String,
    pajamaId: String,
}

export interface PijamaSizeRepository {
    createSizes(data: PijamaSizeCreateInput[]): Promise<void>
    updateSizes(pijamaId: string, sizes: PajamaSize[]): Promise<void>
    deleteSizes(pijamaId: string): Promise<void>
    getSizes(pijamaId: string): Promise<PajamaSize[]>
}