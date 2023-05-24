import { MealsRepository } from "@/repositories/meals-repository";

interface GetAllMetricsUseCaseRequest {
    userId: string;
}
interface GetAllMetricsUseCaseResponse {
    checkInsCount: number;
}
export class GetAllMetricsUseCase {
    constructor(private mealsRepository: MealsRepository) {}

    async execute({
        userId,
    }: GetAllMetricsUseCaseRequest): Promise<GetAllMetricsUseCaseResponse> {
        const checkInsCount = await this.mealsRepository.countByUserId(userId);

        return {
            checkInsCount,
        };
    }
}
