import { Diet, Prisma } from "@prisma/client";

export interface MealsRepository {
    getAll(): Promise<Diet[]>;
    create(data: Prisma.DietCreateInput): Promise<Diet>;
    findById(id: string): Promise<Diet | null>;
    searchMany(query: string, page: number): Promise<Diet[]>;
    findOnlyMeal(dietId: string): Promise<Diet[]>;
    metricsWithinDietByUserId(userId: string): Promise<{ diet: Diet[] }>;
    offDietMetrics(userId: string): Promise<number>;
    countByUserId(userId: string): Promise<number>;
    update(
        id: string,
        data: Prisma.DietUncheckedUpdateInput,
    ): Promise<Diet | null>;
    delete(dietId: string): Promise<boolean>;
}
