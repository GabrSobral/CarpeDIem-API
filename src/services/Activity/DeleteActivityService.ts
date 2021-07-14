import { ArchiveActivity } from "../../entities/ArchiveActivity"
import handleGetRepositories from "../../utils/handleGetRepositories"

class DeleteActivityService{
  async execute(id: string){
    const { activitiesRepository, archiveActivityRepository } = handleGetRepositories()

    const activityExists = await activitiesRepository
    .createQueryBuilder()
    .where("id = :activity", { activity: id })
    .getOne()

    if(!activityExists){
      throw new Error("No activity found status:400")}

    await activitiesRepository.delete(activityExists)

    const ActivityFiles = await archiveActivityRepository.find({ where: { activity: id }})

    if(ActivityFiles.length !== 0){
      ActivityFiles.forEach(async (item) => {
        await archiveActivityRepository
        .createQueryBuilder('arch_act')
        .delete()
        .from(ArchiveActivity)
        .where('activity = :activity', { activity: id })
        .andWhere('archive = :archive', { archive: item.archive })
        .execute()
      })
    }  

    return
  }
}
export default new DeleteActivityService()