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
      .createQueryBuilder('feedback')
      .where('feedback.activity = :activity_id', { activity_id })
      .getOne()

    if(!alreadyExists){
      throw new Error('Feedback not exist status:400')
    }

    await feedbackRepository
      .createQueryBuilder('feedback')
      .delete()
      .from(Feedback)
      .where('user = :user_id', { user_id })
      .andWhere('activity = :activity_id', { activity_id })
      .execute();

    return;
  }
}
export default new DeleteFeedbackService();
