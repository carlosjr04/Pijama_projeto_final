interface PostFeedbackUseCaseRequest {
  name: string;
  description: string;
  rating: number;
}

import { FeedbacksRepository } from "@/repositories/feedbacks-repository";

export class PostFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute({
    name,
    description,
    rating,
  }: PostFeedbackUseCaseRequest) {
    if (rating < 0 && rating > 5) {
      throw new Error("Rating must be a number between 0 and 5");
    }

    const feedback = await this.feedbacksRepository.create({
      name,
      description,
      rating,
    });
    return feedback;
  }
}
