import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { GetAllMetricsUseCase } from "../get-all-metrics";

export function makeFetchAllMealsMetrics() {
    const prismaMealsRepository = new PrismaMealsRepository();
    const getAllMetricsUseCase = new GetAllMetricsUseCase(
        prismaMealsRepository,
    );

    return getAllMetricsUseCase;
}
