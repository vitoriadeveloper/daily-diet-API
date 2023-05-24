import { MealsRepository } from "@/repositories/meals-repository";
import { Diet } from "@prisma/client";

interface GetUserMetricsUseCaseRequest {
    userId: string;
}
interface GetUserMetricsUseCaseResponse {
    diet: Diet[];
}
export class GetUserMetricsUseCase {
    constructor(private mealsRepository: MealsRepository) {}

    async execute({
        userId,
    }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
        const result = await this.mealsRepository.metricsWithinDietByUserId(
            userId,
        );
        const diet = typeof result === "number" ? [] : result.diet;
        return {
            diet,
        };
    }
}
