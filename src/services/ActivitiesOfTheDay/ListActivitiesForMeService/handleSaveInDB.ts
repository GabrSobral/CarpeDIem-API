import { ActivitiesOfTheDay } from "../../../entities/ActivitiesOfTheDay"
import { Activity } from "../../../entities/Activity"
import { User } from "../../../entities/User"
import handleGetRepositories from "../../../utils/handleGetRepositories"

class handleSaveInDB {
  async activities(orderedActivities: Activity[], user: string){
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
  async users(user: User){
    const { userRepository } = handleGetRepositories()
    user.activities_finished_today = 0
    await userRepository.save(user)
  }
}
export default new handleSaveInDB()