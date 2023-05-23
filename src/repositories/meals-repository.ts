import { Diet, Prisma } from "@prisma/client";

export interface MealsRepository {
    create(data: Prisma.DietUncheckedCreateInput): Promise<Diet>;
    findById(id: string): Promise<Diet | null>;
    searchMany(query: string, page: number): Promise<Diet[]>;
    countByUserId(userId: string): Promise<number>;
}
