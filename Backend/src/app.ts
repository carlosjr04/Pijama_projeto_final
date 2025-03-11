import fastify from "fastify";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "./env";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import { userRoutes } from "./http/controllers/user/routes";
import { feedbacksRoutes } from "./http/controllers/feedback/routes";
import { pijamaRoutes } from "./http/controllers/pijama/routes";

export const app = fastify();

app.register(fastifyCors, {
  origin: true,
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});

app.register(fastifyCookie);

app.register(userRoutes);
app.register(pijamaRoutes);
app.register(feedbacksRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "validation error", issues: error.format() });
  }

  return reply.status(500).send({ message: "Internal server error" });
});
