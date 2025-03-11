import { UsersRepository } from "@/repositories/users-repository";
import { Feedback, User } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";
import { FeedbacksRepository } from "@/repositories/feedbacks-repository";

interface GetFeedbackByIdUseCaseRequest {
  feedbackId: string;
}

interface GetFeedbackByIdUseCaseResponse {
  feedback: Feedback | null;
}

export class GetFeedbackByIdUseCase {
  constructor(private FeedbacksRepository: FeedbacksRepository) {}

  async execute({
    feedbackId,
  }: GetFeedbackByIdUseCaseRequest): Promise<GetFeedbackByIdUseCaseResponse> {
    const feedback = await this.FeedbacksRepository.getById(feedbackId);

    if (!feedback) {
      throw new ResourceNotFoundError();
    }

    return { feedback };
  }
}
