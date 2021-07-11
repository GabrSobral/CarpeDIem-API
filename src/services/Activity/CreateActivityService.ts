import handleGetRepositories from "../../utils/handleGetRepositories"

interface CreateActivityServiceProps {
  title: string;
  description: string;
  category: string;
  body: string;
}

class CreateActitivityService {
  async execute({ title, description, category, body }: CreateActivityServiceProps){
    const { activitiesRepository } = handleGetRepositories()

    const activity = activitiesRepository.create({ title, description, category, body })
    await activitiesRepository.save(activity)

    return activity
  }
}
export default new CreateActitivityService()