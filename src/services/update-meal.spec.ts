import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { Diet } from "@prisma/client";
import { UpdateMealUseCase } from "./update-meal";

let mealsRepository: InMemoryMealsRepository;
let sut: UpdateMealUseCase;
let diet: Diet;

describe("Update a meal user case", () => {
    beforeEach(async () => {
        mealsRepository = new InMemoryMealsRepository();
        sut = new UpdateMealUseCase(mealsRepository);
        diet = await mealsRepository.create({
            id: "diet-01",
            name: "Feijão",
            description: "Uma feijoada pela manhã",
            isDiet: false,
            userId: "user.id",
        });
    });

    it("Should be able to update a meal", async () => {
        const updatedMeal = await sut.execute({
            dietId: diet.id, // Passa o ID da refeição
            name: "Feijão",
            description: "Uma feijoada ao meio dia",
            isDiet: false,
        });
        expect(updatedMeal).toEqual({
            diet: expect.objectContaining({
                id: diet.id,
                name: "Feijão",
                description: "Uma feijoada ao meio dia",
                isDiet: false,
            }),
        });

        const retrievedMeal = await mealsRepository.findById(diet.id); // Obtém a refeição atualizada do repositório
        expect(retrievedMeal).toEqual(updatedMeal.diet); // Verifica se a refeição no repositório corresponde à refeição atualizada
    });
});
