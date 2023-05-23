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
}