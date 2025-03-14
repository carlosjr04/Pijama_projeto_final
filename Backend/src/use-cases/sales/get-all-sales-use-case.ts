import { SalesRepository } from "@/repositories/sales-repository";
import { Sale } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";

interface GetAllUseCaseResponse {
    sales: Sale[] | null
}

export class GetAllSalesUseCase {
    constructor(private salesRepository: SalesRepository){}

    async execute(): Promise<GetAllUseCaseResponse> {
        const sales = await this.salesRepository.getAll()
        if (!sales){
            throw new ResourceNotFoundError()
        }

        return { sales }
    }
}