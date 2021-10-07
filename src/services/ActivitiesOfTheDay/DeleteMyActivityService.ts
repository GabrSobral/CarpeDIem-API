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
      .findOne({ activity: activity, destined_to: user })

    if(!activityExists)
      throw new Error("Activity not found status:400")
    
    await activitiesOfTheDayRepository.delete({ activity, destined_to: user })

    return
  }
}
export default new DeleteMyActivityService()