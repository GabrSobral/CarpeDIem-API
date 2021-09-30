import { Activity } from "../entities/Activity"
import handleGetRepositories from "../utils/handleGetRepositories"

class handlePutFilesInActivities {
  async execute(activities: Activity[], user_id: string){
    const { archiveActivityRepository, feedbackRepository } = handleGetRepositories()

    const activitiesThatHaveFiles = await Promise.all(activities.map(async (item) => {
      const ActivityFiles = await archiveActivityRepository
        .find({ 
          relations: ['JoinArchive', 'JoinActivity', 'JoinCategory'], 
          where: { activity: item.id }
        })
      const FeedbackActivity = await feedbackRepository
        .findOne({ where: { user: user_id, activity: item.id }})

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
        id: item.id,
        title: item.title,
        description: item.description,
        body: item.body,
        category: {
          id: item.JoinCategory.id,
          name: item.JoinCategory.name
        },
        created_at: item.created_at,
        updated_at: item.updated_at,
        files,
        feedback: {
          feedback: FeedbackActivity ? FeedbackActivity.feedback : undefined,
          created_at: FeedbackActivity ? FeedbackActivity.created_at : undefined
        }
      }
    }))

    return activitiesThatHaveFiles
  }
}
export default new handlePutFilesInActivities().execute