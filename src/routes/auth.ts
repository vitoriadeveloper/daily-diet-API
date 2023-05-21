import { authenticate } from "@/http/controllers/users/authenticate";
import { register } from "@/http/controllers/users/register";
import { FastifyInstance } from "fastify";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", register);
    app.post("/sessions", authenticate);
    // TODO app.get("/profile")
}
