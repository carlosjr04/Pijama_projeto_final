import { PijamasRepository } from "@/repositories/pijamas-repository"
import { Pajamas } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface ReadPijamaUseCaseRequest {
    pijamaId: string
}

interface ReadPijamaUseCaseResponse {
    pijama: Pajamas
}

export class ReadPijamaUseCase {
    constructor (private PijamasRepository: PijamasRepository){}

    async execute ({pijamaId}: ReadPijamaUseCaseRequest): Promise<ReadPijamaUseCaseResponse> {

        const pijama = await this.PijamasRepository.findById(userId)

        if (!pijama){
            throw new ResourceNotFoundError
        }

        return { pijama }
    }
}