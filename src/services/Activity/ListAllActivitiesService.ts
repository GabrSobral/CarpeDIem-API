import handleGetRepositories from "../../utils/handleGetRepositories";
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities";

class ListAllActivitiesService {
  async execute(user_id: string){
    const { activitiesRepository } = handleGetRepositories()

    const allActivities = await activitiesRepository.find({ relations: ["JoinCategory"] })

    const allFormattedActivities = await handlePutFilesInActivities(allActivities, user_id)

    return allFormattedActivities
  }
}
export default new ListAllActivitiesService()