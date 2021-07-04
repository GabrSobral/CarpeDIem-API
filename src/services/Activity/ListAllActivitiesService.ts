import { getCustomRepository } from "typeorm";
import { ActivityRepository } from "../../repositories/ActivityRepository.";

class ListAllActivitiesService {
  async execute(){
    const repository = getCustomRepository(ActivityRepository)

    const allActivities = await repository.find()

    return allActivities
  }
}
export default new ListAllActivitiesService()