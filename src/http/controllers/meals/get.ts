import { makeGetAllMeals } from "@/services/factories/make-get-all-meals";
import { FastifyReply, FastifyRequest } from "fastify";

export async function get(_: FastifyRequest, res: FastifyReply) {
    const getAllMeals = makeGetAllMeals();
    const meals = await getAllMeals.execute();
    return res.status(200).type("application/json").send(meals);
}
