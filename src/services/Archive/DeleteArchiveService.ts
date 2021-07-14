import { Archive } from "../../entities/Archive"
import handleGetRepositories from "../../utils/handleGetRepositories"

class DeleteArchiveService{
  async execute(archive_id: string){
    const { archiveRepository } = handleGetRepositories()

    await archiveRepository
      .createQueryBuilder('arch_act')
      .delete()
      .from(Archive)
      .where('id = :archive', { archive: archive_id })
      .execute()

    return
  }
}
export default new DeleteArchiveService()