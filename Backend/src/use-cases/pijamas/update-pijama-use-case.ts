import { PijamasRepository, PijamaUpdateInput } from "@/repositories/pijamas-repository";
import { Pajamas } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";

interface UpdatePijamaUseCaseRequest {
    pijamaId: string,
    data: PijamaUpdateInput
}

interface UpdatePijamaUseCaseResponse {
    pijama: Pajamas
}

export class UpdatePijamaUseCase {
    constructor (private PijamasRepository: PijamasRepository){}

    async execute({pijamaId, data}: UpdatePijamaUseCaseRequest): Promise<UpdatePijamaUseCaseResponse>{

        const pijama = await this.PijamasRepository.findById(pijamaId)
        if (!pijama){
            throw new ResourceNotFoundError()
        }

        const pijamaUpdated = await this.PijamasRepository.update(pijamaId, data)

        if (!pijamaUpdated){
            throw new ResourceNotFoundError()
        }
    
        return { pijama: pijamaUpdated }

    }
}