import { Address, Prisma } from "@prisma/client";

export interface AddressRepository {
    firstOrCreate(data: Prisma.AddressCreateInput): Promise<Address>
}