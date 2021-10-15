  
import { ArchiveActivity } from "../../entities/ArchiveActivity";
import handleGetRepositories from "../../utils/handleGetRepositories";

class DeleteArchiveActivityService {
  async execute(activity: string){
    const { archiveActivityRepository } = handleGetRepositories()

    const ArchiveActivities = await archiveActivityRepository.find({ where: { activity } })

    ArchiveActivities.forEach(async (item) =>{
      await archiveActivityRepository.delete({ activity, archive: item.archive })
    })
    return
  }
}
export default new DeleteArchiveActivityService()