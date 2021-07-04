import { getCustomRepository } from "typeorm"
import { ActivityRepository } from "../../repositories/ActivityRepository."

interface CreateActivityServiceProps {
  title: string;
  description: string;
  category: string;
}

class CreateActitivityService {
  async execute({ title, description, category }: CreateActivityServiceProps){
    const repository = getCustomRepository(ActivityRepository)

    const activity = repository.create({ title, description, category })
    await repository.save(activity)

    return activity
  }
}
export default new CreateActitivityService()