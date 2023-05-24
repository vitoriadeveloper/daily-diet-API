import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { DeleteMealUseCase } from "../delete-meal";

export function makeDeleteMealUseCase() {
    const prismaMealRepository = new PrismaMealsRepository();
    const deleteUseCase = new DeleteMealUseCase(prismaMealRepository);
    return deleteUseCase;
}
