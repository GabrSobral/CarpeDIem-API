import { ActivitiesOfTheDay } from "../../../entities/ActivitiesOfTheDay"
import { Activity } from "../../../entities/Activity"
import handleGetRepositories from "./handleGetRepositories"

class handleSaveActivitiesInDB {
  async execute(orderedActivities: Activity[], user: string){
    const { activitiesOfTheDayRepository } = handleGetRepositories()
    const currentDate = new Date().toUTCString()
    
    await activitiesOfTheDayRepository
    .createQueryBuilder()
    .delete()
    .from(ActivitiesOfTheDay)
    .where('destined_to = :user', { user })
    .execute()

    for (let index = 0; index < orderedActivities.length; index++) {
      const activity = orderedActivities[index].id
      const destined_to = user

      const activitiesOfTheDay = activitiesOfTheDayRepository.create({
        activity, destined_to, date: currentDate
      })
      await activitiesOfTheDayRepository.save(activitiesOfTheDay)
    }
  }
}
export default new handleSaveActivitiesInDB().execute