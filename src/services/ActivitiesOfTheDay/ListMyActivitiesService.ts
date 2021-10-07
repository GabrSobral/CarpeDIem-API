import handleGetRepositories from "../../utils/handleGetRepositories";
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities";

class ListMyActivitiesService {
  async execute(user: string){
    const { activitiesOfTheDayRepository, activitiesRepository } = handleGetRepositories()

    const myActivities = await activitiesOfTheDayRepository.find(
      { where: { destined_to: user }, relations: ["JoinActivity"] })

    const activities = await Promise.all(myActivities.map(async (item) => {
      return await activitiesRepository
      .findOne(item.JoinActivity.id, { relations: [ "JoinCategory" ] })
    }))

    const myActivitiesFormatted = await handlePutFilesInActivities({activities , user_id: user})

    return myActivitiesFormatted
  }
}
export default new ListMyActivitiesService()