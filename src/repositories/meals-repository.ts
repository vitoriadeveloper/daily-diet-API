import { Diet, Prisma } from "@prisma/client";

export interface MealsRepository {
    getAll(): Promise<Diet[]>;
    create(data: Prisma.DietUncheckedCreateInput): Promise<Diet>;
    findById(id: string): Promise<Diet | null>;
    searchMany(query: string, page: number): Promise<Diet[]>;
    findOnlyMeal(dietId: string): Promise<Diet[]>;
    countByUserId(userId: string): Promise<number>;
    update(
        id: string,
        data: Prisma.DietUncheckedUpdateInput,
    ): Promise<Diet | null>;
    delete(dietId: string): Promise<boolean>;
}
