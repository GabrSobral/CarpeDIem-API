import { ArchiveActivity } from "../../entities/ArchiveActivity";
import handleGetRepositories from "../../utils/handleGetRepositories";

class DeleteArchiveActivityService {
  async execute(activity: string){
    const { archiveActivityRepository } = handleGetRepositories()

    const ArchiveActivities = await archiveActivityRepository.find({ where: { activity } })

    ArchiveActivities.forEach(async (item) =>{
      await archiveActivityRepository
      .createQueryBuilder('arch_act')
      .delete()
      .from(ArchiveActivity)
      .where('activity = :activity', { activity })
      .andWhere('archive = :archive', { archive: item.archive })
      .execute()
    })
    return
  }
}
export default new DeleteArchiveActivityService()