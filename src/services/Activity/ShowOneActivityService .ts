import handleGetRepositories from "../../utils/handleGetRepositories";
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities";

class ShowOneActivityService {
  async execute(id: string){
    const { activitiesRepository } = handleGetRepositories()

    const activity = await activitiesRepository
    .findOne(id, { relations: ["JoinCategory"] })

    if(!activity){
      throw new Error('Activity not found status:400')
    }

    const [ formattedActivity ] = await handlePutFilesInActivities([activity])

    return formattedActivity
  }
}
export default new ShowOneActivityService()