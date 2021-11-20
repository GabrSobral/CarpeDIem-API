import handleGetRepositories from "../../utils/handleGetRepositories";
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities";

interface ListAllActivitiesServiceProps {
  user_id: string;
  cmd: "count" | "select"
}

class ListAllActivitiesService {
  async execute({user_id, cmd}: ListAllActivitiesServiceProps){
    const { activitiesRepository } = handleGetRepositories()

    const allActivities = await activitiesRepository.find({ relations: ["JoinCategory"] })

    const allFormattedActivities = await handlePutFilesInActivities(
      {activities: allActivities, user_id, feedbackCMD: cmd})

    return allFormattedActivities
  }
}
export default new ListAllActivitiesService()