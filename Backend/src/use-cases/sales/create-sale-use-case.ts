import { AddressRepository } from "@/repositories/address-repository";
import { SalesRepository } from "@/repositories/sales-repository";
import { Sale } from "@prisma/client";
import { QuantityNotSufficientError } from "../errors/quantity-not-sufficient-error";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";
import { PijamasRepository } from "@/repositories/pijamas-repository";
import { PijamaSizeRepository } from "@/repositories/pijamaSize-repository";

interface PajamaSize {
    pajamaId: string;
    quantity: number;
    size: string;
}

interface CreateUseCaseRequest {

    buyer_name: string
    cpf: string
    price: number
    payment_method: string
    installments?: number
    card_number?: string

    zip_code: string
    state: string
    city: string
    neighborhood: string
    address: string
    number: string

    pajamas: PajamaSize[]
}


interface CreateSaleUseCaseResponse {
    sale: Sale
}

export class CreateSaleUseCase {
    constructor (
        private SalesRepository: SalesRepository, 
        private AddressRepository: AddressRepository,
        private PajamasRepository: PijamasRepository,
        private PajamaSizeRepository: PijamaSizeRepository
    ){}

    async execute({buyer_name, cpf, price, payment_method, installments, card_number, zip_code, state, city, address, neighborhood, number, pajamas}: CreateUseCaseRequest): Promise<CreateSaleUseCaseResponse> {

        if (payment_method.toLowerCase() === "credit card" || payment_method.toLowerCase() === "debit card"){
            if (!card_number) {
                throw new Error("O número do cartão é necessário para efetuar a compra no método de pagamento escolhido")
            }
        }

        for (const pajama of pajamas) {
            const pajamaExists = await this.PajamasRepository.findById(pajama.pajamaId);

            const pajamaSize = await this.PajamaSizeRepository.getSize(pajama.pajamaId, pajama.size)

            if (pajamaSize === null || !pajamaExists){
                throw new ResourceNotFoundError()
            }

            if (pajamaSize.stock_quantity < pajama.quantity){
                throw new QuantityNotSufficientError()
            }
        }

        const createdAddress = await this.AddressRepository.firstOrCreate({
            zip_code,
            state,
            city,
            address,
            neighborhood,
            number

        })

        const sale = await this.SalesRepository.create({
            buyer_name,
            cpf,
            price,
            addressId: createdAddress.id,
            payment_method,
            installments,
            card_number
        })

        return { sale }
    }
}