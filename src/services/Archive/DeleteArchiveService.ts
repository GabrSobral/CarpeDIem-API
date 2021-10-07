import handleGetRepositories from "../../utils/handleGetRepositories"
import handleDeleteFromCloud from "./handleDeleteFromCloud"

class DeleteArchiveService{
  async execute(archive_id: string){
    const { archiveRepository, archiveActivityRepository } = handleGetRepositories()

    const archive = await archiveRepository.findOne({ where: { id: archive_id} })

    await archiveActivityRepository.delete({ archive: archive_id })
    await archiveRepository.delete({ id: archive_id })

    await handleDeleteFromCloud.execute(archive.public_id)

    return
  }
}
export default new DeleteArchiveService()