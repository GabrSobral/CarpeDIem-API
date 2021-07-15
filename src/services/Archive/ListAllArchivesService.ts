import handleGetRepositories from "../../utils/handleGetRepositories"

class ListAllArchivesService {
  async execute(){
    const { archiveRepository } = handleGetRepositories()

    const archives = await archiveRepository.find()

    const formattedArchives = archives.map(file => (
      {
        id: file.id,
        name: file.name,
        size: file.size,
        url: file.url,
        duration: Math.round(Number(file.duration)),
        format: file.format,
        created_at: file.created_at,
      }
    ))

    return formattedArchives
  }
}
export default new ListAllArchivesService()