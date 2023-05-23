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

    async countByUserId(userId: string) {
        return this.items.filter((item) => item.userId === userId).length;
    }
}