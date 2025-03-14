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
    sale_percent?: number;
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
        sale_percent
    }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {

        if (on_sale === true){
            if (!sale_percent){
                throw new Error("Informe a porcentagem de desconto")
            }
        }else{
            sale_percent = undefined
        }

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
            sale_percent
        });

        const sizes: PijamaSizeCreateInput[] = ["PP", "P", "M", "G", "GG"].map((size) => ({
            stock_quantity: 5,
            size,
            pajamaId: pijama.id,
        }));

        await this.pijamaSizeRepository.createSizes(sizes);

        return { pijama }
    }
}
