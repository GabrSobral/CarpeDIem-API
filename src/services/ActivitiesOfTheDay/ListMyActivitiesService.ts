import { getCustomRepository } from "typeorm";
import { ActivitiesOfTheDayRepository } from "../../repositories/ActivitiesOfTheDayRepository";
import handlePutFilesInActivities from "./ListActivitiesForMeService/handlePutFilesInActivities";

class ListMyActivitiesService {
  async execute(user: String){
    const repository = getCustomRepository(ActivitiesOfTheDayRepository)

    const myActivities = await repository
    .createQueryBuilder('activity')
    .where("activity.destined_to = :user", { user })
    .leftJoinAndSelect('activity.JoinActivity', 'JoinActivity')
    .getMany()

    const activities = myActivities.map(item => item.JoinActivity)

    const myActivitiesFormatted = await handlePutFilesInActivities(activities)

    return myActivitiesFormatted
  }
}
export default new ListMyActivitiesService()