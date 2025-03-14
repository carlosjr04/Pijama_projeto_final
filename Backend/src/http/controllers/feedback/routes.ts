import { FastifyInstance } from "fastify";
import { postFeedbacks } from "./postFeedbacks";
import { getAll } from "./getAll";
import { getFeedbackById } from "./getFeedbackById";
import { deleteFeedbackById } from "./deleteFeedbacks";

export async function feedbacksRoutes(app: FastifyInstance) {
  app.post("/feedbacks", postFeedbacks);
  app.delete("/feedbacks/:feedbackId", deleteFeedbackById);
  app.get("/feedbacks/getAll", getAll);
  app.get("/feedbacks/:feedbackId", getFeedbackById);
}
