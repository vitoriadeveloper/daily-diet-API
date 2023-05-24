import { MealsRepository } from "@/repositories/meals-repository";

import { ResourceNotFound } from "./errors/resource-not-found";

interface DeleteMealUseCaseRequest {
    dietId: string;
}

export class DeleteMealUseCase {
    constructor(private mealsRepository: MealsRepository) {}

    async execute({ dietId }: DeleteMealUseCaseRequest): Promise<boolean> {
        const data = await this.mealsRepository.findById(dietId);

        if (!data) {
            throw new ResourceNotFound();
        }

        await this.mealsRepository.delete(dietId);

        return true;
    }
}
