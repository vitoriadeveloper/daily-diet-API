import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { UpdateMealUseCase } from "../update-meal";

export function makeUpdateMealUseCase() {
    const prismaMealRepository = new PrismaMealsRepository();
    const updateUseCase = new UpdateMealUseCase(prismaMealRepository);

    return updateUseCase;
}
