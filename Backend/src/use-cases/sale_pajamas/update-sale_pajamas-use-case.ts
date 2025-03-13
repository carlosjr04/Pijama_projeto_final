import { PijamasRepository } from "@/repositories/pijamas-repository"
import { Sale_pajamasRepository, Sale_pajamasUpdateInput } from "@/repositories/sale_pajamas-repository"
import { Sale_Pajamas } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface UpdateUseCaseRequest {
    sale_pajamaId: string
    pajamaId: string
    data: Sale_pajamasUpdateInput
}

interface UpdateUseCaseResponse {
    sale_pajama: Sale_Pajamas | null
}

// Não está pronto
/*export class UpdateSale_PajamasUseCase {
    constructor(private sale_PajamasRepository: Sale_pajamasRepository, private pajamasRepository: PijamasRepository){}

    async execute( {sale_pajamaId, pajamaId, data }: UpdateUseCaseRequest ): Promise<UpdateUseCaseResponse> {
        
        const sale_pajamaExists = await this.sale_PajamasRepository.findById(sale_pajamaId)
        if (!sale_pajamaExists){
            throw new ResourceNotFoundError()
        }

        if (data.quantity){
            const pajama = await this.pajamasRepository.findById(pajamaId)
            if (!pajama){
                throw new ResourceNotFoundError()
            }

            data.price = data.quantity*pajama.price
        }

        const sale_pajama = null
        
        return sale_pajama
    }
}*/