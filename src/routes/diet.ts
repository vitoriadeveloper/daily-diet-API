import { createMeal } from "@/http/controllers/meals/create";
import { deleteMeal } from "@/http/controllers/meals/delete";
import { get } from "@/http/controllers/meals/get";
import { getOnlyMeal } from "@/http/controllers/meals/get-only-user-meals";
import { updateMeal } from "@/http/controllers/meals/update";
import { verifyJWT } from "@/http/controllers/middleware/verify-jwt";
import { FastifyInstance } from "fastify";
export async function dietDailyRoutes(app: FastifyInstance) {
    app.addHook("onRequest", verifyJWT);
    app.post("/meals", createMeal);
    app.put("/meals/:id", updateMeal);
    app.get("/meals/:id", getOnlyMeal);
    app.get("/meals", get);
    app.delete("/meals/:id", deleteMeal);
}
