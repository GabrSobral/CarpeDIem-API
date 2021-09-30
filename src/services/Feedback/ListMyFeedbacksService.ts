import handleGetRepositories from '../../utils/handleGetRepositories';
import handlePutFilesInActivities from '../../utils/handlePutFilesInActivities';

class ListMyFeedbacksService {
  async execute(user_id: string) {
    const { feedbackRepository, archiveActivityRepository } = handleGetRepositories();

    const myFeedbacks = await feedbackRepository.find({
      where: { user: user_id },
      relations: ['JoinActivity', 'JoinCategory']
    });

    const activities = myFeedbacks.map(item => ({
      ...item.JoinActivity,
      JoinCategory: item.JoinCategory
    }))

    const activitiesThatHaveFiles = await handlePutFilesInActivities(activities, user_id)

    return activitiesThatHaveFiles;
  }
}
export default new ListMyFeedbacksService();
