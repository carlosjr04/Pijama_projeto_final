import { PijamasRepository } from "@/repositories/pijamas-repository"
import { Pajamas } from "@prisma/client"
import { ResourceNotFoundError } from "../errors/resource-not-fount-error"

interface DeletePiajamaUseCaseRequest {
    pijamaId: string
}

interface DeletePiajamaUseCaseResponse {
    pijama: Pajamas
}


export class DeletePijamaUseCase {
    constructor (private PijamasRepository: PijamasRepository){}

    async execute({pijamaId}: DeletePiajamaUseCaseRequest){
        const user = await this.PijamasRepository.findById(pijamaId)
        if (!user){
            throw new ResourceNotFoundError()
        }

        await this.PijamasRepository.delete(pijamaId)
    }
}