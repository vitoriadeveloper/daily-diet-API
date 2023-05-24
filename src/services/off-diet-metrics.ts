import { MealsRepository } from "@/repositories/meals-repository";

interface OffDietMetricsUseCaseRequest {
    userId: string;
}
interface OffDietMetricsUseCaseResponse {
    checkInsCount: number;
}
export class OffDietMetricsUseCase {
    constructor(private mealsRepository: MealsRepository) {}

    async execute({
        userId,
    }: OffDietMetricsUseCaseRequest): Promise<OffDietMetricsUseCaseResponse> {
        const checkInsCount = await this.mealsRepository.offDietMetrics(userId);

        return {
            checkInsCount,
        };
    }
}
