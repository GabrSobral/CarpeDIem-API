import handleGetRepositories from "../../utils/handleGetRepositories";
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities";

class ListMyActivitiesService {
  async execute(user: String){
    const { activitiesOfTheDayRepository, activitiesRepository } = handleGetRepositories()

    const myActivities = await activitiesOfTheDayRepository
    .createQueryBuilder('activity')
    .where("activity.destined_to = :user", { user })
    .leftJoinAndSelect('activity.JoinActivity', 'JoinActivity')
    .getMany()

    const activities = await Promise.all(myActivities.map(async (item) => {
      const activity = await activitiesRepository
      .findOne(item.JoinActivity.id, { relations: [ "JoinCategory" ] })

      return activity
    }))

    const myActivitiesFormatted = await handlePutFilesInActivities(activities)

    return myActivitiesFormatted
  }
}
export default new ListMyActivitiesService()