import { MealsRepository } from "@/repositories/meals-repository";
import { Diet } from "@prisma/client";

interface GetAllUserMealsUserCaseResponse {
    diets?: Diet[];
}

interface GetAllUserMealsUserCaseRequest {
    dietId: string;
}

export class GetAllUserMealsUseCase {
    constructor(private mealsRepository: MealsRepository) {}

    async execute({
        dietId,
    }: GetAllUserMealsUserCaseRequest): Promise<GetAllUserMealsUserCaseResponse> {
        const diets = await this.mealsRepository.findOnlyMeal(dietId);

        return { diets };
    }
}
