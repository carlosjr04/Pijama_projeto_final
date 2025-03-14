import { PijamasRepository } from "@/repositories/pijamas-repository";

interface Pajamas {
    name: string;
    description: string;
    image: string;
    price: number;
    season: string;
    type: string;
    gender: string;
    favorite: boolean;
    on_sale: boolean;
}

interface CreateManyUseCaseRequest{
    pajamas: Pajamas[]
}

export class CreateManyPajamasUseCase {
    constructor(private pajamasRepository: PijamasRepository){}

    async execute( {pajamas}: CreateManyUseCaseRequest) {
        await this.pajamasRepository.createMany(pajamas)
    }
}