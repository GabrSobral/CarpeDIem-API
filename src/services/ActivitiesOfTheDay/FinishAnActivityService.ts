import { ActivitiesOfTheDay } from "../../entities/ActivitiesOfTheDay"
import handleGetRepositories from "../../utils/handleGetRepositories"

interface FinishAnActivityProps{
  user: string;
  activity: string;
}

class FinishAnActivityService{
  async execute({ user, activity }: FinishAnActivityProps){
    const { activitiesOfTheDayRepository } = handleGetRepositories()

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
export default new FinishAnActivityService()