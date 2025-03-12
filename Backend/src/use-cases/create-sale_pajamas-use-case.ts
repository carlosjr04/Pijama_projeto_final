import { Sale_pajamasRepository } from "@/repositories/sale_pajamas-repository"
import { SalesRepository } from "@/repositories/sales-repository"
import { Sale_Pajamas } from "@prisma/client"

interface CreateUseCaseRequest {
    quantity: number
    price: number

    pajamaId: string
    saleId: string
}

interface CreateUseCaseResponse {
    sale_pajamas: Sale_Pajamas
}

export class CreateSale_PajamasUseCase {
    constructor (private sale_pajamasRepository: Sale_pajamasRepository, private pajamasRepository: pajamasRepository, private salesRepository: SalesRepository){}
}