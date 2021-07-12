import { ActivitiesOfTheDay } from "../../entities/ActivitiesOfTheDay"
import handleGetRepositories from "../../utils/handleGetRepositories"

interface FinishAnActivityProps{
  user: string;
  activity: string;
}

class FinishAnActivityService{
  async execute({ user, activity }: FinishAnActivityProps){
    const { activitiesOfTheDayRepository, userRepository } = handleGetRepositories()

    const activityExists = await activitiesOfTheDayRepository
    .createQueryBuilder()
    .where("activity = :activity", { activity })
    .andWhere("destined_to = :user", { user })
    .getOne()

    if(!activityExists){
      throw new Error("Activity not found status:400")
    }

    await activitiesOfTheDayRepository
    .createQueryBuilder()
    .delete()
    .from(ActivitiesOfTheDay)
    .where("activity = :activity", { activity })
    .andWhere("destined_to = :user", { user })
    .execute()

    const user_data = await userRepository.findOne(user)
    user_data.activities_finished_today = user_data.activities_finished_today + 1
    user_data.all_activities_finished = user_data.all_activities_finished + 1

    await userRepository.save(user_data)

    return
  }
}
export default new FinishAnActivityService()