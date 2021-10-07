import { ArchiveActivity } from "../../entities/ArchiveActivity"
import { Activity } from "../../entities/Activity"
import handleGetRepositories from "../../utils/handleGetRepositories"

class DeleteActivityService{
  async execute(id: string){
    const { 
      activitiesRepository, 
      archiveActivityRepository,
      feedbackRepository,} = handleGetRepositories()

    const activityExists = await activitiesRepository.findOne({ where: { id } })

    if(!activityExists){  
      throw new Error("No activity found status:400")}

    await archiveActivityRepository.delete({ activity: id })  
    await activitiesRepository.delete({ id })
    await feedbackRepository.delete({ activity: id })

    return
  }
}
export default new DeleteActivityService()