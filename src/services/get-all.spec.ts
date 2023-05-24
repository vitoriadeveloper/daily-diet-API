import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { Diet } from "@prisma/client";
import { GetAllMealsUseCase } from "./get-all";

let mealsRepository: InMemoryMealsRepository;
let sut: GetAllMealsUseCase;
let diet1: Diet;
let diet2: Diet;

describe("Get all meals use case", () => {
    beforeEach(async () => {
        mealsRepository = new InMemoryMealsRepository();
        sut = new GetAllMealsUseCase(mealsRepository);
        diet1 = await mealsRepository.create({
            id: "diet-01",
            name: "Feijão",
            description: "Uma feijoada pela manhã",
            isDiet: false,
            userId: "user.id",
        });
        diet2 = await mealsRepository.create({
            id: "diet-02",
            name: "Arroz",
            description: "Arroz com feijão",
            isDiet: false,
            userId: "user.id",
        });
    });

    it("Should get all meals", async () => {
        const allMeals = await sut.execute();
        expect(allMeals).toEqual([diet1, diet2]);
    });
});
