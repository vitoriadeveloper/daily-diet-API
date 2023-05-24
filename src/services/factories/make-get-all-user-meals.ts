import { PrismaMealsRepository } from "@/repositories/prisma/prisma-meals-repository";
import { GetAllUserMealsUseCase } from "../get-all-user-meals";

export function makeGetAllUserMealsUseCase() {
    const prismaMealRepository = new PrismaMealsRepository();
    const getAllMealsUseCase = new GetAllUserMealsUseCase(prismaMealRepository);

    return getAllMealsUseCase;
}
