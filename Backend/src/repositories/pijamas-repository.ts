import { Pajamas, PajamaSize, Prisma, User } from ".prisma/client";

export interface PijamaUpdateInput {
    name?: string,
    description?: string,
    image?: string,
    price?: number,
    season?: string,
    type?: string,
    gender?: string,
    favorite?: boolean,
    on_sale?: boolean,
    sale_percent?: number,
}

export interface PijamasRepository {
    create(data:Prisma.PajamasCreateInput): Promise<Pajamas>
    update(id: string, data: Prisma.PajamasUpdateInput): Promise<Pajamas | null>
    delete(id: string): Promise<void>
    findById(userId: string): Promise<Pajamas | null>
    //adição dos métodos de manipular os pijamas
    createSizes(data: any): Promise<void> // ESTÁ SEM TIPO // FAZER DEPOIS!!!!
    updateSize(pijamaId: string, size:PajamaSize): Promise<void>
    updateSizes(pijamaId: string, sizes: PajamaSize[]): Promise<void>
    deleteSizes(pijamaId: string): Promise<void>
    getSize(pijamaId: string, size: string): Promise<PajamaSize | null>
    getSizes(pijamaId: string): Promise<PajamaSize[]>

}