import { UsersRepository } from "@/repositories/users-repository";
import { Feedback, User } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";
import { FeedbacksRepository } from "@/repositories/feedbacks-repository";

interface GetFeedbackUseCaseRequest {
  userId: string;
}

interface GetFeedbackUseCaseResponse {
  feedbacks: Feedback[];
}

export class GetFeedbackUseCase {
  constructor(private FeedbacksRepository: FeedbacksRepository) {}

  async execute({
    userId,
  }: GetFeedbackUseCaseRequest): Promise<GetFeedbackUseCaseResponse> {
    const feedbacks = await this.FeedbacksRepository.getByUserId(userId);

    if (!feedbacks) {
      throw new ResourceNotFoundError();
    }

    return { feedbacks };
  }
}
