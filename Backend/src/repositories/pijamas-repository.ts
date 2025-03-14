import { Pajamas, Prisma } from ".prisma/client";

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
    getAll(): Promise<Pajamas[] | null>
    createMany(data:Prisma.PajamasCreateInput[]): Promise<void>
}