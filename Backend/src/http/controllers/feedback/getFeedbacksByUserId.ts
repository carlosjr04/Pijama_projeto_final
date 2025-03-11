import { PrismaFeedbacksRepository } from "@/repositories/prisma/prisma-feedbacks-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-fount-error";
import { GetFeedbackUseCase } from "@/use-cases/feedbacks/get-feedbacks-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getFeedbacksByUserId(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const getParamsSchema = z.object({
    userId: z.string(),
  });

  const { userId } = getParamsSchema.parse(request.params);

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const getFeedbackUseCase = new GetFeedbackUseCase(
      prismaFeedbacksRepository
    );

    const feedbacks = await getFeedbackUseCase.execute({
      userId,
    });
    return feedbacks;
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }
    throw err;
  }
}
