import { PrismaFeedbacksRepository } from "@/repositories/prisma/prisma-feedbacks-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { GetFeedbackByIdUseCase } from "@/use-cases/feedbacks/get-feedback-by-id-use-case";
import { GetFeedbackUseCase } from "@/use-cases/feedbacks/get-feedbacks-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getFeedbackById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getParamsSchema = z.object({
    feedbackId: z.string(),
  });

  const { feedbackId } = getParamsSchema.parse(request.params);

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const getFeedbackUseCase = new GetFeedbackByIdUseCase(
      prismaFeedbacksRepository
    );

    const feedbacks = await getFeedbackUseCase.execute({
      feedbackId,
    });
    return feedbacks;
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
