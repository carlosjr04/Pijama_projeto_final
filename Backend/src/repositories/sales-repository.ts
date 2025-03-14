import { Prisma, Sale, Sale_Pajamas } from "@prisma/client";

export interface SaleUpdateInput {
  buyer_name?: string;
  cpf?: string;
  price?: number;
  payment_method?: string;
  installments?: number;
  card_number?: string;
  addressId?: string;
}

export interface SalesRepository {
  findById(id: string): Promise<Sale | null>;
  findSalesByAddressId(addressId: string): Promise<Sale[] | null>;
  create(data: Prisma.SaleUncheckedCreateInput): Promise<Sale>;
  update(
    id: string,
    data: Prisma.SaleUncheckedUpdateInput
  ): Promise<Sale | null>;
  deleteById(id: string): Promise<void>;
  getAll():Promise<Sale[] | null>
}
