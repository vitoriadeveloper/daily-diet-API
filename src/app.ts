import fastify from "fastify";
import { dietDailyRoutes } from "./routes/diet";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import { usersRoutes } from "./routes/auth";
export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: "7 days",
    },
});
app.register(dietDailyRoutes);
app.register(usersRoutes);
