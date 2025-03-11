import { Address, Prisma } from "@prisma/client";

export interface AddressUpdateInput {
    zip_code?: string 
    state?: string 
    city?: string 
    address?: string 
    neighborhood?: string 
    number?: string
}

export interface AddressRepository {
    firstOrCreate(data: Prisma.AddressCreateInput): Promise<Address>
    findById(id: string): Promise<Address | null>
}