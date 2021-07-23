import handleGetRepositories from '../../utils/handleGetRepositories';

interface CreateFeedbackServiceProps {
  user_id: string;
  activity_id: string;
  feedback: boolean;
}

class CreateFeedbackService {
  async execute({
    user_id,
    activity_id,
    feedback
  }: CreateFeedbackServiceProps) {
    const { feedbackRepository, activitiesRepository } =
      handleGetRepositories();

    const activity = await activitiesRepository.findOne({
      where: { id: activity_id }
    });
    const newFeedback = feedbackRepository.create({
      user: user_id,
      activity: activity_id,
      category: activity.category,
      feedback
    });

    await feedbackRepository.save(newFeedback);

    return newFeedback;
  }
}
export default new CreateFeedbackService();
