import { AddressRepository } from "@/repositories/address-repository";
import { SalesRepository } from "@/repositories/sales-repository";
import { ResourceNotFoundError } from "./errors/resource-not-fount-error";

interface DeleteUseCaseRequest {
  saleId: string;
}

export class DeleteSaleUseCase {
  constructor(
    private salesRepository: SalesRepository,
    private addressRepository: AddressRepository
  ) {}

  async execute({ saleId }: DeleteUseCaseRequest): Promise<void> {
    const sale = await this.salesRepository.findById(saleId);
    if (!sale) {
      throw new ResourceNotFoundError();
    }

    const sales = await this.salesRepository.findSalesByAddressId(
      sale.addressId
    );

    if (sales === null) {
      throw new ResourceNotFoundError();
    }

    if (sales.length === 1) {
      const address = await this.addressRepository.findById(sale.addressId);
      if (!address) {
        throw new ResourceNotFoundError();
      }
      await this.salesRepository.deleteById(saleId);
      await this.addressRepository.deleteById(sale.addressId);
    } else if (sales.length > 1) {
      await this.salesRepository.deleteById(saleId);
    }
  }
}
