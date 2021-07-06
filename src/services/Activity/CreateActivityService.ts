import { getCustomRepository } from "typeorm"
import { ActivityRepository } from "../../repositories/ActivityRepository."

interface CreateActivityServiceProps {
  title: string;
  description: string;
  category: string;
  body: string;
}

class CreateActitivityService {
  async execute({ title, description, category, body }: CreateActivityServiceProps){
    const repository = getCustomRepository(ActivityRepository)

    const activity = repository.create({ title, description, category, body })
    await repository.save(activity)

    return activity
  }
}
export default new CreateActitivityService()