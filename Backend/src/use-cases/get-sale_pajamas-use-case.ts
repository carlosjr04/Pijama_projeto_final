import { Sale_pajamasRepository } from "@/repositories/sale_pajamas-repository"
import { Sale_Pajamas } from "@prisma/client"
import { ResourceNotFoundError } from "./errors/resource-not-fount-error"

interface GetUseCaseRequest {
    saleId: string
}

interface GetUseCaseResponse {
    sales_pajamas: Sale_Pajamas[]
}

export class GetSale_PajamasUseCase {
    constructor(private sale_pajamasRepository: Sale_pajamasRepository){}

    async execute({ saleId }: GetUseCaseRequest): Promise<GetUseCaseResponse> {

        const sales_pajamas = await this.sale_pajamasRepository.getBySaleId(saleId)
        if (!sales_pajamas){
            throw new ResourceNotFoundError()
        }

        return { sales_pajamas }
    }
}