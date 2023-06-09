import { Prisma, Diet } from "@prisma/client";
import { MealsRepository } from "../meals-repository";
import { randomUUID } from "node:crypto";

export class InMemoryMealsRepository implements MealsRepository {
    public items: Diet[] = [];
    async create(data: Prisma.DietUncheckedCreateInput) {
        const meal: Diet = {
            id: data.id ?? randomUUID(),
            userId: data.userId,
            name: data.name,
            description: data.description,
            date: new Date(),
            isDiet: data.isDiet ?? false,
        };

        this.items.push(meal);

        return meal;
    }

    async findById(id: string) {
        const meal = this.items.find((item) => item.id === id);

        if (!meal) {
            return null;
        }

        return meal;
    }

    async searchMany(query: string, page: number) {
        return this.items
            .filter((item) => item.name.includes(query))
            .slice((page - 1) * 10, page * 10);
    }

    async metricsWithinDietByUserId(userId: string) {
        const diet = this.items.filter(
            (item) => item.userId === userId && item.isDiet,
        );
        return { diet };
    }

    async offDietMetrics(userId: string) {
        return this.items.filter(
            (item) => item.userId === userId && item.isDiet === false,
        ).length;
    }

    async countByUserId(userId: string) {
        return this.items.filter((item) => item.userId === userId).length;
    }

    async update(
        id: string,
        data: Prisma.DietUpdateInput,
    ): Promise<Diet | null> {
        const index = this.items.findIndex((item) => item.id === id);

        if (index === -1) {
            return null; // Retorna null se a refeição não for encontrada
        }

        const existingMeal = this.items[index];
        const updatedMeal = {
            ...existingMeal,
            ...data,
        } as Diet;

        this.items[index] = updatedMeal;

        return updatedMeal;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.items.findIndex((item) => item.id === id);

        if (index === -1) {
            return false; // user not found
        }

        this.items.splice(index, 1);

        return true;
    }

    async findOnlyMeal(dietId: string) {
        const meal = this.items.filter((item) => item.id === dietId);

        return meal;
    }

    async getAll() {
        return this.items;
    }
}
