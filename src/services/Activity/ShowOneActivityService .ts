import handleGetRepositories from "../../utils/handleGetRepositories";
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities";

class ShowOneActivityService {
  async execute(id: string){
    const { activitiesRepository } = handleGetRepositories()

    const activity = await activitiesRepository.findOne(id)

    const [ formattedActivity ] = await handlePutFilesInActivities([activity])

    return formattedActivity
  }
}
export default new ShowOneActivityService()