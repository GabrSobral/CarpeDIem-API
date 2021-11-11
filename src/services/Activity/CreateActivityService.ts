import handleGetRepositories from "../../utils/handleGetRepositories"
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities"

interface CreateActivityServiceProps {
  title: string;
  description: string;
  category: string;
  body: string;
  user_id: string;
}

class CreateActitivityService {
  async execute({ title, description, category, body, user_id }: CreateActivityServiceProps){
    const { activitiesRepository } = handleGetRepositories()

    const activity = activitiesRepository.create({ title, description, category, body })
    await activitiesRepository.save(activity)
    const activityWithAllData = await activitiesRepository.findOne(activity.id, { relations: ['JoinCategory'] })

    const [allFormattedActivities] = await handlePutFilesInActivities(
      {activities: [activityWithAllData], user_id, feedbackCMD: 'count'})

    return allFormattedActivities
  }
}
export default new CreateActitivityService()