import handleGetRepositories from "../../utils/handleGetRepositories"

interface ChangeActivityProps {
  id: string;
  title: string;
  description: string;
  body: string;
  category: string;
}

class ChangeActivityService {
  async execute({ id, title,description, body, category }: ChangeActivityProps){
    const { activitiesRepository } = handleGetRepositories()
    const activity = await activitiesRepository.findOne(id)

    if(!activity){
      throw new Error("No activity found status:400")}

    if(title){ activity.title = title }
    if(description){ activity.description = description }
    if(body){ activity.body = body }
    if(category){ activity.category = category }

    await activitiesRepository.save(activity)

    return activity
  }
}
export default new ChangeActivityService()