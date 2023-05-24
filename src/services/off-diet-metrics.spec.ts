import { InMemoryMealsRepository } from "@/repositories/in-memory/in-memory-meals-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { OffDietMetricsUseCase } from "./off-diet-metrics";

let mealsRepository: InMemoryMealsRepository;
let sut: OffDietMetricsUseCase;

describe("Get off diet user metrics use case", () => {
    beforeEach(async () => {
        mealsRepository = new InMemoryMealsRepository();
        sut = new OffDietMetricsUseCase(mealsRepository);
        await mealsRepository.create({
            id: "diet-01",
            name: "Feijão",
            description: "Uma feijoada pela manhã",
            isDiet: false,
            userId: "user.id",
        });
        await mealsRepository.create({
            id: "diet-02",
            name: "Arroz",
            description: "Arroz com feijão",
            isDiet: false,
            userId: "user.id",
        });
        await mealsRepository.create({
            id: "diet-03",
            name: "Arroz",
            description: "Arroz com feijão",
            isDiet: true,
            userId: "user.id",
        });
        await mealsRepository.create({
            id: "diet-04",
            name: "Arroz",
            description: "Arroz com feijão",
            isDiet: true,
            userId: "user.id",
        });
        await mealsRepository.create({
            id: "diet-05",
            name: "Arroz",
            description: "Arroz com feijão",
            isDiet: false,
            userId: "user.id",
        });
    });

    it("Should be possible to get all user metrics off diet", async () => {
        const { checkInsCount } = await sut.execute({
            userId: "user.id",
        });
        expect(checkInsCount).toEqual(3);
    });
});
