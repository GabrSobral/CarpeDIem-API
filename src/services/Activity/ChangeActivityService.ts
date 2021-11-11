import handleGetRepositories from "../../utils/handleGetRepositories"
import handlePutFilesInActivities from "../../utils/handlePutFilesInActivities"

interface ChangeActivityProps {
  id: string;
  title: string;
  description: string;
  body: string;
  category: string;
  user_id: string;
}

class ChangeActivityService {
  async execute({ id, title,description, body, category, user_id }: ChangeActivityProps){
    const { activitiesRepository } = handleGetRepositories()
    const activity = await activitiesRepository.findOne(id)

    if(!activity){
      throw new Error("No activity found status:400")}

    if(title){ activity.title = title }
    if(description){ activity.description = description }
    if(body){ activity.body = body }
    if(category){ activity.category = category }

    await activitiesRepository.save(activity)

    const activityWithAllData = await activitiesRepository.findOne(id, { relations: ["JoinCategory"] })
    const [ formattedActivity ] = await handlePutFilesInActivities(
      { activities: [activityWithAllData], user_id, feedbackCMD: "count" })

    return formattedActivity
  }
}
export default new ChangeActivityService()