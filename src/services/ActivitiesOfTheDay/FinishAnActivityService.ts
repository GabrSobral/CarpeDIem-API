import handleGetRepositories from "../../utils/handleGetRepositories"

interface FinishAnActivityProps{
  user: string;
  activity: string;
}

class FinishAnActivityService{
  async execute({ user, activity }: FinishAnActivityProps){
    const { activitiesOfTheDayRepository, userRepository } = handleGetRepositories()

    const activityExists = await activitiesOfTheDayRepository
      .findOne({ where: { activity, destined_to: user } })

    if(!activityExists)
      throw new Error("Activity not found status:400")

    await activitiesOfTheDayRepository.delete({ activity, destined_to: user })

    const userData = await userRepository.findOne({ where: { id: user }})
    await userRepository.update(
      { id: user }, 
      {
        activities_finished_today: userData.activities_finished_today + 1,
        all_activities_finished: userData.all_activities_finished + 1
      })

    return
  }
}
export default new FinishAnActivityService()