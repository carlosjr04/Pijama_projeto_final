import { FastifyInstance } from "fastify";
import { postFeedbacks } from "./postFeedbacks";

export async function feedbacksRoutes(app: FastifyInstance) {
  app.post("/feedbacks", postFeedbacks);
  // app.get("/feedbacks/:userId", get);
  // app.delete("/feedbacks/:userId", deleteUser);
}
