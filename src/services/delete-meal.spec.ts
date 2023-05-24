import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { Diet } from "@prisma/client";

import { DeleteMealUseCase } from "./delete-meal";

let mealsRepository: InMemoryMealsRepository;
let sut: DeleteMealUseCase;
let diet: Diet;

describe("Delete a meal user case", () => {
    beforeEach(async () => {
        mealsRepository = new InMemoryMealsRepository();
        sut = new DeleteMealUseCase(mealsRepository);
        diet = await mealsRepository.create({
            id: "diet-01",
            name: "Feijão",
            description: "Uma feijoada pela manhã",
            isDiet: false,
            userId: "user.id",
        });
    });

    it("Should be able to delete a meal", async () => {
        const deletedMeal = await sut.execute({
            dietId: diet.id,
        });
        expect(deletedMeal).toEqual(true);
    });
});
