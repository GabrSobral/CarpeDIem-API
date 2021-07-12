import { ActivitiesOfTheDay } from "../../entities/ActivitiesOfTheDay"
import handleGetRepositories from "../../utils/handleGetRepositories"

interface DeleteMyActivityServiceProps{
  user: string;
  activity: string;
}

class DeleteMyActivityService{
  async execute({ user, activity }: DeleteMyActivityServiceProps){
    const { activitiesOfTheDayRepository } = handleGetRepositories()

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

    return
  }
}
export default new DeleteMyActivityService()