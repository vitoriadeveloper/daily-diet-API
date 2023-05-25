import { MealsRepository } from "@/repositories/meals-repository";
import { Diet } from "@prisma/client";

interface CreateMealUserCaseRequest {
    name: string;
    description: string;
    isDiet: boolean;
    userId: string;
    date: Date;
}

interface CreateMealUserCaseResponse {
    diet: Diet;
}

export class CreateMealUseCase {
    constructor(private mealsRepository: MealsRepository) {}

    async execute({
        name,
        description,
        isDiet,
        userId,
        date,
    }: CreateMealUserCaseRequest): Promise<CreateMealUserCaseResponse> {
        const diet = await this.mealsRepository.create({
            name,
            description,
            isDiet,
            userId,
            date,
        });

        return { diet };
    }
}
