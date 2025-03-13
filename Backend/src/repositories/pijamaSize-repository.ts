import { PajamaSize } from ".prisma/client";

export interface PijamaSizeCreateInput {
    stock_quantity: Number,
    size: String,
    pajamaId: String,
}

export interface PijamaSizeRepository {
    createSizes(data: PijamaSizeCreateInput[]): Promise<void>
    updateSize(pijamaId: string, size:PajamaSize): Promise<void>
    updateSizes(pijamaId: string, sizes: PajamaSize[]): Promise<void>
    deleteSizes(pijamaId: string): Promise<void>
    getSize(pijamaId: string, size: string): Promise<PajamaSize | null>
    getSizes(pijamaId: string): Promise<PajamaSize[]>
}