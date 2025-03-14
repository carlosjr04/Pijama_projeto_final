import { Prisma, Feedback } from "@prisma/client";

export interface FeedbacksRepository {
  getAll(): Promise<Feedback[] | null>;
  getByUserId(userId: string): Promise<Feedback[]>;
  getById(feedbackId: string): Promise<Feedback | null>;
  create(data: Prisma.FeedbackCreateInput): Promise<Feedback>;
  deleteById(feedbackId: string): Promise<void>;
}
