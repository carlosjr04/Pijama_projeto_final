import { PrismaFeedbacksRepository } from "@/repositories/prisma/prisma-feedbacks-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { DeleteFeedbackUseCase } from "@/use-cases/feedbacks/delete-feedbacks-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteFeedbackById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getParamsSchema = z.object({
    feedbackId: z.string(),
  });

  const { feedbackId } = getParamsSchema.parse(request.params);

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const deleteFeedbackUseCase = new DeleteFeedbackUseCase(
      prismaFeedbacksRepository
    );

    await deleteFeedbackUseCase.execute({
      feedbackId,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
