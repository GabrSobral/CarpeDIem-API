import { Archive } from "../../entities/Archive"
import { ArchiveActivity } from "../../entities/ArchiveActivity"
import handleGetRepositories from "../../utils/handleGetRepositories"
import handleDeleteFromCloud from "./handleDeleteFromCloud"

class DeleteArchiveService{
  async execute(archive_id: string){
    const { archiveRepository, archiveActivityRepository } = handleGetRepositories()

    const archivesActivities = await archiveActivityRepository.find({ where: {archive: archive_id} })
    const archive = await archiveRepository.findOne({ where: { id: archive_id} })

    archivesActivities.forEach(async (item) => {
      await archiveActivityRepository
      .createQueryBuilder('arch_act')
      .delete()
      .from(ArchiveActivity)
      .where('archive = :archive', { archive: archive_id })
      .andWhere('activity = :activity', {activity: item.activity})
      .execute()
    })

    await archiveRepository
      .createQueryBuilder()
      .delete()
      .from(Archive)
      .where('id = :archive', { archive: archive_id })
      .execute()

    await handleDeleteFromCloud.execute(archive.public_id)

    return
  }
}
export default new DeleteArchiveService()