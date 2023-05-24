import fastify from "fastify";
import { dietDailyRoutes } from "./routes/diet";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { env } from "./env";
import { usersRoutes } from "./routes/auth";
export const app = fastify();

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
        cookieName: "refreshToken",
        signed: false,
    },
    sign: {
        expiresIn: "7 days",
    },
});
app.register(fastifyCookie);
// app.addHook("preHandler", async (request, reply) => {
//     try {
//         await request.jwtVerify();
//     } catch (err) {
//         reply.status(401).send({ message: "Unauthorized" });
//     }
// });

app.register(dietDailyRoutes);
app.register(usersRoutes);
