
import { Feedback, User } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";
import { FeedbacksRepository } from "@/repositories/feedbacks-repository";

interface GetFeedbackUseCaseResponse {
  feedbacks: Feedback[];
}

export class GetFeedbackUseCase {
  constructor(private FeedbacksRepository: FeedbacksRepository) {}

  async execute(): Promise<GetFeedbackUseCaseResponse> {
    const feedbacks = await this.FeedbacksRepository.getAll();
    if (!feedbacks) {
      throw new ResourceNotFoundError();
    }

    return { feedbacks };
  }
}
