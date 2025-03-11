import { FeedbacksRepository } from "@/repositories/feedbacks-repository";
import { ResourceNotFoundError } from "../errors/resource-not-fount-error";

interface DeleteFeedbackUseCaseRequest {
  feedbackId: string;
}

export class DeleteFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute({ feedbackId }: DeleteFeedbackUseCaseRequest) {
    const feedback = await this.feedbacksRepository.getById(feedbackId);
    if (!feedback) {
      throw new ResourceNotFoundError();
    }

    await this.feedbacksRepository.deleteById(feedbackId);
  }
}
