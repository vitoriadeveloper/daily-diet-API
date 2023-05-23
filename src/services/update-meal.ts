import { MealsRepository } from "@/repositories/meals-repository";
import { Diet } from "@prisma/client";

import { ResourceNotFound } from "./errors/resource-not-found";

interface UpdateMealUseCaseResponse {
    diet: Diet | null;
}

interface UpdateMealUseCaseRequest {
    dietId: string;
    name: string;
    description: string;
    isDiet: boolean;
}

export class UpdateMealUseCase {
    constructor(private mealsRepository: MealsRepository) {}

    async execute({
        name,
        isDiet,
        description,
        dietId,
    }: UpdateMealUseCaseRequest): Promise<UpdateMealUseCaseResponse> {
        const data = await this.mealsRepository.findById(dietId);

        if (!data) {
            throw new ResourceNotFound();
        }

        const diet = await this.mealsRepository.update(data.id, {
            name,
            isDiet,
            description,
        });

        return { diet };
    }
}
