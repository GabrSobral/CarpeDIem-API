import { Activity } from "../../../entities/Activity"
import handleGetRepositories from "../../../utils/handleGetRepositories"

class handlePutFilesInActivities {
  async execute(activities: Activity[]){
    const { archiveActivityRepository } = handleGetRepositories()

    const [ activitiesThatHaveFiles ] = await Promise.all(activities.map(async (item) => {
      const ActivityFiles = await archiveActivityRepository
      .find({ 
        relations: ['JoinArchive', 'JoinActivity', 'JoinCategory'], 
        where: { activity: item.id }
      })
      
      return ActivityFiles
    }))

    const orderedActivitiesWithFiles =  activities.map(item => {
      const activityFiles = activitiesThatHaveFiles.filter(element => element.JoinActivity.id === item.id)

      const files = activityFiles.map(file => ({
        id: file.JoinArchive.id,
        name: file.JoinArchive.name,
        url: file.JoinArchive.url,
        format: file.JoinArchive.format,
        category: file.JoinCategory.name,
        duration: file.JoinArchive.duration,
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

    return orderedActivitiesWithFiles
  }
}
export default new handlePutFilesInActivities().execute