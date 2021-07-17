import { ArchiveActivity } from "../../entities/ArchiveActivity"
import { Activity } from "../../entities/Activity"
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

    await activitiesRepository
    .createQueryBuilder()
    .delete()
    .from(Activity)
    .where('id = :activity', { activity:  activityExists.id})
    .execute()

    return
  }
}
export default new DeleteActivityService()