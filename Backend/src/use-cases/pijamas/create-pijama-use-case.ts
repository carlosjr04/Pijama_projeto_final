import { PijamasRepository } from "@/repositories/pijamas-repository";
import { PijamaSizeCreateInput, PijamaSizeRepository } from "@/repositories/pijamaSize-repository";
import { Pajamas, PajamaSize } from "@prisma/client";

interface CreateUseCaseRequest {
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

interface CreateUseCaseResponse {
    pijama: Pajamas;
}

export class CreateUseCase {
    constructor(private pijamasRepository: PijamasRepository, private pijamaSizeRepository: PijamaSizeRepository) {}

    async execute({
        name,
        description,
        image,
        price,
        season,
        type,
        gender,
        favorite,
        on_sale,
    }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
        const pijama = await this.pijamasRepository.create({
            name,
            description,
            image,
            price,
            season,
            type,
            gender,
            favorite,
            on_sale,
        });

        const sizes: PijamaSizeCreateInput[] = ["PP", "P", "M", "G", "GG"].map((size) => ({
            stock_quantity: 0,
            size,
            pajamaId: pijama.id,
        }));

        await this.pijamaSizeRepository.createSizes(sizes);

        return { pijama }
    }
}
