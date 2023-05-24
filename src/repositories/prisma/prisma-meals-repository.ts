import { Prisma } from "@prisma/client";
import { MealsRepository } from "../meals-repository";
import { prisma } from "@/lib/prisma";

export class PrismaMealsRepository implements MealsRepository {
    async create(data: Prisma.DietUncheckedCreateInput) {
        const meal = prisma.diet.create({
            data,
        });

        return meal;
    }

    async findById(id: string) {
        const meal = await prisma.diet.findUnique({
            where: {
                id,
            },
        });
        return meal;
    }

    async searchMany(query: string, page: number) {
        const meals = await prisma.diet.findMany({
            where: {
                name: {
                    contains: query,
                },
            },
            take: 10,
            skip: (page - 1) * 10,
        });
        return meals;
    }

    async countByUserId(userId: string) {
        const count = await prisma.diet.count({
            where: {
                userId,
            },
        });
        return count;
    }

    async update(id: string, data: Prisma.DietUncheckedUpdateInput) {
        const meal = await prisma.diet.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                isDiet: data.isDiet,
                date: data.date,
            },
        });

        return meal;
    }

    async delete(id: string) {
        await prisma.diet.delete({
            where: { id },
        });

        return true;
    }

    async findOnlyMeal(dietId: string) {
        const diets = await prisma.diet.findMany({
            where: {
                id: dietId,
            },
        });
        return diets;
    }

    async getAll() {
        const diet = await prisma.diet.findMany();
        return diet;
    }

    async metricsWithinDietByUserId(userId: string) {
        const diet = await prisma.diet.findMany({
            where: { userId },
        });

        return { diet };
    }

    async offDietMetrics(userId: string): Promise<number> {
        const count = await prisma.diet.count({
            where: {
                userId,
            },
        });
        return count;
    }
}
