import handleGetRepositories from "../../utils/handleGetRepositories"

class ListAllArchivesService {
  async execute(){
    const { archiveRepository } = handleGetRepositories()

    const archives = await archiveRepository.find()

    const formattedArchives = archives.map(file => (
      {
        id: file.id,
        name: file.name,
        description: file.description,
        url: file.url,
        author: file.author,
        duration: Math.round(Number(file.duration)),
        format: file.format
      }
    ))

    return formattedArchives
  }
}
export default new ListAllArchivesService()