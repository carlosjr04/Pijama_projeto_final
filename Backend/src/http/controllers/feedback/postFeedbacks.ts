import { PrismaFeedbacksRepository } from "@/repositories/prisma/prisma-feedbacks-repository";
import { PostFeedbackUseCase } from "@/use-cases/feedbacks/post-feedbacks-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function postFeedbacks(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const feedbackBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    rating: z.number().min(0).max(5),
  });

  const { name, description, rating } = feedbackBodySchema.parse(
    request.body
  );

  try {
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
    const postFeedbackUseCase = new PostFeedbackUseCase(
      prismaFeedbacksRepository
    );

    const feedback = await postFeedbackUseCase.execute({
      name,
      description,
      rating,
    });
    return feedback;
  } catch (err: any) {
    console.log(err)
    return reply.status(409).send({ message: err.message });
  }
}
