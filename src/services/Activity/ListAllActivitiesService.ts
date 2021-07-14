import handleGetRepositories from "../../utils/handleGetRepositories";
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities";

class ListAllActivitiesService {
  async execute(){
    const { activitiesRepository } = handleGetRepositories()

    const allActivities = await activitiesRepository.find()

    const allFormattedActivities = await handlePutFilesInActivities(allActivities)

    return allFormattedActivities
  }
}
export default new ListAllActivitiesService()