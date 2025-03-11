import { FastifyInstance } from "fastify";
import { postFeedbacks } from "./postFeedbacks";
import { getFeedbacksByUserId } from "./getFeedbacksByUserId";
import { getFeedbackById } from "./getFeedbackById";
import { deleteFeedbackById } from "./deleteFeedbacks";

export async function feedbacksRoutes(app: FastifyInstance) {
  app.post("/feedbacks", postFeedbacks);
  app.delete("/feedbacks/:feedbackId", deleteFeedbackById);
  app.get("/feedbacks-by-userId/:userId", getFeedbacksByUserId);
  app.get("/feedbacks/:feedbackId", getFeedbackById);
}
