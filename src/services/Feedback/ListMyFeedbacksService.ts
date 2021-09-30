import handleGetRepositories from '../../utils/handleGetRepositories';
import handlePutFilesInActivities from '../../utils/handlePutFilesInActivities';

class ListMyFeedbacksService {
  async execute(user_id: string) {
    const { feedbackRepository, archiveActivityRepository } = handleGetRepositories();

    const myFeedbacks = await feedbackRepository.find({
      where: { user: user_id },
      relations: ['JoinActivity', 'JoinCategory']
    });
    

    const activitiesThatHaveFiles = await Promise.all(myFeedbacks.map(async (item) => {
      const ActivityFiles = await archiveActivityRepository
      .find({ 
        relations: ['JoinArchive', 'JoinActivity', 'JoinCategory'], 
        where: { activity: item.JoinActivity.id }
      })

      const files = ActivityFiles.map(file => ({
        id: file.JoinArchive.id,
        name: file.JoinArchive.name,
        url: file.JoinArchive.url,
        format: file.JoinArchive.format,
        category: file.JoinCategory.name,
        size: file.JoinArchive.size,
        duration: Math.round(Number(file.JoinArchive.duration)),
        created_at: file.JoinArchive.created_at,
      }))

      return {
        id: item.JoinActivity.id,
        title: item.JoinActivity.title,
        description: item.JoinActivity.description,
        body: item.JoinActivity.body,
        category: {
          id: item.JoinCategory.id,
          name: item.JoinCategory.name
        },
        created_at_activity: item.JoinActivity.created_at,
        updated_at_activity: item.JoinActivity.updated_at,
        created_at_feedback: item.created_at,
        files,
        feedback: item.feedback
      }
    }))

    return activitiesThatHaveFiles;
  }
}
export default new ListMyFeedbacksService();
