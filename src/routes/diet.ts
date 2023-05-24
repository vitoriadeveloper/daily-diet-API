import { createMeal } from "@/http/controllers/meals/create";
import { getOnlyMeal } from "@/http/controllers/meals/get-only-user-meals";
import { updateMeal } from "@/http/controllers/meals/update";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
export async function dietDailyRoutes(app: FastifyInstance) {
    app.post("/meals", createMeal);
    app.put("/meals/:id", updateMeal);
    app.get("/meals/:id", getOnlyMeal);
    app.get("/meals", async () => {
        const test = await prisma.diet.findMany({
            orderBy: {
                date: "asc",
            },
        });
        return test;
    });
    app.delete("/meals/:id", async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(req.params);

        const test = await prisma.diet.delete({
            where: { id },
        });
        return test;
    });
}
