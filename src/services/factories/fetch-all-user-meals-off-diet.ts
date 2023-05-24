import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { OffDietMetricsUseCase } from "../off-diet-metrics";

export function fetchAllUserMealsOffDiet() {
    const prismaMealsRepository = new PrismaMealsRepository();
    const mealsOffDiet = new OffDietMetricsUseCase(prismaMealsRepository);
    return mealsOffDiet;
}
