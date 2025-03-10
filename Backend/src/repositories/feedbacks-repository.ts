import { Prisma, Feedback } from "@prisma/client";

export interface FeedbacksRepository {
  getAll(): Promise<Feedback[]>;
  getByUserId(userId: string): Promise<Feedback[]>;
  create(data: Prisma.FeedbackCreateInput): Promise<Feedback>;
  deleteByUserId(userId: string): Promise<void>;
}
