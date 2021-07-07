import { getCustomRepository } from "typeorm";
import { ActivityRepository } from "../../repositories/ActivityRepository.";
import { ArchiveActivityRepository } from "../../repositories/ArchiveActivityRepository";

class ListAllActivitiesService {
  async execute(){
    const repository = getCustomRepository(ActivityRepository)
    const archiveActivityRepository = getCustomRepository(ArchiveActivityRepository)

    const allArchivesActivities = await archiveActivityRepository.find({ relations: ['JoinArchive', 'JoinActivity', 'JoinCategory'] })
    const allArchives = await repository.find()

    const allFormattedActivities = allArchives.map(item => {
      const allFiles = allArchivesActivities.filter(element => element.JoinActivity.id === item.id)

      const files = allFiles.map(file => ({
        id: file.JoinArchive.id,
        name: file.JoinArchive.name,
        url: file.JoinArchive.url,
        category: file.JoinCategory.name
      }))

      return {
        id: item.id,
        title: item.title,
        description: item.description,
        body: item.body,
        category: item.category,
        files
      }
    })

    return allFormattedActivities
  }
}
export default new ListAllActivitiesService()