import { getCustomRepository } from "typeorm";
import { ActivitiesOfTheDayRepository } from "../../repositories/ActivitiesOfTheDayRepository";

class ListMyActivitiesService {
  async execute(user: String){
    const repository = getCustomRepository(ActivitiesOfTheDayRepository)

    const myActivities = await repository
    .createQueryBuilder('activity')
    .where("activity.destined_to = :user", { user })
    .getMany()

    return myActivities
  }
}
export default new ListMyActivitiesService()