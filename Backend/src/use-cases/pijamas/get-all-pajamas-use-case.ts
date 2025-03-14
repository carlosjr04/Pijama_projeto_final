import { PijamasRepository } from "@/repositories/pijamas-repository";
import { Pajamas } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";

interface GetAllUseCaseResponse {
    pajamas: Pajamas[] | null
}

export class GetAllPajamasUseCase {
    constructor(private pajamasRepository: PijamasRepository){}

    async execute(): Promise<GetAllUseCaseResponse> {
        const pajamas = await this.pajamasRepository.getAll()
        if (!pajamas){
            throw new ResourceNotFoundError()
        }

        return { pajamas }
    }
}