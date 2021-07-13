import handleGetRepositories from "../../utils/handleGetRepositories";

class ListAllActivitiesService {
  async execute(){
    const { activitiesRepository, archiveActivityRepository } = handleGetRepositories()

    const allArchivesActivities = await archiveActivityRepository.find({ relations: ['JoinArchive', 'JoinActivity', 'JoinCategory'] })
    const allArchives = await activitiesRepository.find()

    const allFormattedActivities = allArchives.map(item => {
      const allFiles = allArchivesActivities.filter(element => element.JoinActivity.id === item.id)

      const files = allFiles.map(file => ({
        id: file.JoinArchive.id,
        name: file.JoinArchive.name,
        url: file.JoinArchive.url,
        category: file.JoinCategory.name,
        duration: file.JoinArchive.duration,
        format: file.JoinArchive.format
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