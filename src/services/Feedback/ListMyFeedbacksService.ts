import handleGetRepositories from '../../utils/handleGetRepositories';

class ListMyFeedbacksService {
  async execute(user_id: string) {
    const { feedbackRepository } = handleGetRepositories();

    const myFeedbacks = await feedbackRepository.find({
      where: { user: user_id }
    });

    return myFeedbacks;
  }
}
export default new ListMyFeedbacksService();
