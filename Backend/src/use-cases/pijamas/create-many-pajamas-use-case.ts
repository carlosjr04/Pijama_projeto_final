import { PijamasRepository } from "@/repositories/pijamas-repository";
import { PijamaSizeCreateInput, PijamaSizeRepository } from "@/repositories/pijamaSize-repository";

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
    sale_percent?: number
}

interface CreateManyUseCaseRequest {
    pajamas: Pajamas[];
}

export class CreateManyPajamasUseCase {
    constructor(private pajamasRepository: PijamasRepository, private pajamasizeRepository: PijamaSizeRepository) {}

    async execute({ pajamas }: CreateManyUseCaseRequest) {
        const updatedPajamas = pajamas.map((pajama) => ({
            ...pajama,
            sale_percent: pajama.on_sale ? (pajama.sale_percent ?? 0) : null
        }));

        const createdPajamas = await Promise.all(updatedPajamas.map((pajama) => 
            this.pajamasRepository.create(pajama)
        ));

        for (const pajama of createdPajamas) {
            const sizes: PijamaSizeCreateInput[] = ["PP", "P", "M", "G", "GG"].map((size) => ({
                stock_quantity: 5,
                size,
                pajamaId: pajama.id 
            }));

            await this.pajamasizeRepository.createSizes(sizes);
        }
    }
}