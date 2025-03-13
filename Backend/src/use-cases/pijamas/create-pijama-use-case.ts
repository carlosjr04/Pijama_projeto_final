import { PijamasRepository } from "@/repositories/pijamas-repository";
import { Pajamas } from "@prisma/client";

interface CreateUseCaseRequest {
    name: string,
    description: string,
    image: string,
    price: number,
    season: string,
    type: string,
    gender: string,
    favorite: boolean,
    on_sale: boolean
}

interface CreateUseCaseResponse {
    pijama: Pajamas
}

export class CreateUseCase {
    constructor (private PijamasRepository: PijamasRepository){}

    async execute ({ name, description, image, price, season, type, gender, favorite, on_sale }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {

        const pijama = await this.PijamasRepository.create({
            name,
            description,
            image,
            price,
            season,
            type,
            gender,
            favorite,
            on_sale
        })

        return { pijama }

    }
}