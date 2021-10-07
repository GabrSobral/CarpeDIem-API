import { Feedback } from '../../entities/Feedback';
import handleGetRepositories from '../../utils/handleGetRepositories';

interface DeleteFeedbackServiceProps {
  user_id: string;
  activity_id: string;
}

class DeleteFeedbackService {
  async execute({ user_id, activity_id }: DeleteFeedbackServiceProps) {
    const { feedbackRepository } = handleGetRepositories();

    const alreadyExists = await feedbackRepository
      .findOne({ where: { activity: activity_id } })

    if(!alreadyExists)
      throw new Error('Feedback not exist status:400')

    await feedbackRepository.delete({ user: user_id, activity: activity_id })

    return;
  }
}
export default new DeleteFeedbackService();
