import { Prisma, Feedback } from "@prisma/client";
import { FeedbacksRepository } from "../feedbacks-repository";
import { prisma } from "@/lib/prisma";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async getAll(): Promise<Feedback[]> {
    const feedbacks = await prisma.feedback.findMany();
    return feedbacks;
  }

  async getByUserId(userId: string): Promise<Feedback[]> {
    const feedbacks = await prisma.feedback.findMany({
      where: { userId },
    });
    return feedbacks;
  }

  async create(data: Prisma.FeedbackCreateInput): Promise<Feedback> {
    const feedback = await prisma.feedback.create({
      data,
    });
    return feedback;
  }

  async deleteByUserId(userId: string): Promise<void> {
    await prisma.feedback.deleteMany({
      where: { userId },
    });
  }
}
