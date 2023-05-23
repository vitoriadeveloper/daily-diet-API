import { authenticate } from "@/http/controllers/users/authenticate";
import { refresh } from "@/http/controllers/users/refresh";
import { register } from "@/http/controllers/users/register";
import { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);
    // TODO app.get("/profile")

    app.patch("/token/refresh", refresh);
}
