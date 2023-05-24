import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export function fetchUserMealsDiet() {
    const prismaMealsRepository = new PrismaMealsRepository();
    const fetchUserMealsDiet = new GetUserMetricsUseCase(prismaMealsRepository);
    return fetchUserMealsDiet;
}
