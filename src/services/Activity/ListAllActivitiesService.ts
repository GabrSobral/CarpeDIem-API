import handleGetRepositories from "../../utils/handleGetRepositories";
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities";

class ListAllActivitiesService {
  async execute(user_id: string){
    const { activitiesRepository, feedbackRepository } = handleGetRepositories()

    const allActivities = await activitiesRepository.find({ relations: ["JoinCategory"] })

    const allFormattedActivities = await handlePutFilesInActivities(
      {activities: allActivities, user_id, feedbackCMD: 'count'})

    return allFormattedActivities
  }
}
export default new ListAllActivitiesService()