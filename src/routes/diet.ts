import { createMeal } from "@/http/controllers/meals/create";
import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";
export async function dietDailyRoutes(app: FastifyInstance) {
    app.post("/meals", createMeal);
    app.put("/meals/:id", async (req) => {
        const postBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            isDiet: z.coerce.boolean().default(false),
            date: z.string().refine((value) => !isNaN(Date.parse(value))),
        });
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(req.params);

        const { name, description, isDiet, date } = postBodySchema.parse(
            req.body,
        );

        const test = await prisma.diet.update({
            where: { id },
            data: {
                userId: "1",
                name,
                description,
                isDiet,
                date,
            },
        });
        return test;
    });
    app.get("/meals/:id", async (req) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });
        const { id } = paramsSchema.parse(req.params);

        const test = await prisma.diet.findUniqueOrThrow({
            where: { id },
        });
        return test;
    });
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
