interface PostFeedbackUseCaseRequest {
  userId: string;
  name: string;
  description: string;
  rating: number;
}

import { FeedbacksRepository } from "@/repositories/feedbacks-repository";

export class PostFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute({
    userId,
    name,
    description,
    rating,
  }: PostFeedbackUseCaseRequest) {
    if (rating < 0 && rating > 5) {
      throw new Error("Rating must be a number between 0 and 5");
    }

    const feedback = await this.feedbacksRepository.create({
      user: { connect: { id: userId } },
      name,
      description,
      rating,
    });
    return feedback;
  }
}
