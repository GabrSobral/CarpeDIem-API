import { Activity } from "../../entities/Activity";
import { Answer } from "../../entities/Answer";
import { ArchiveActivity } from "../../entities/ArchiveActivity";
import { Category } from "../../entities/Category";
import { Question } from "../../entities/Question";
import handleGetRepositories from "../../utils/handleGetRepositories";

class DeleteCategoryService {
  async execute(category_id: string){
    const {
      categoryRepository,
      activitiesRepository,
      answerRepository,
      questionRepository,
      archiveActivityRepository
    } = handleGetRepositories()

    const categoryExists = await categoryRepository.findOne({ where: {id : category_id} })

    if(!categoryExists){
      throw new Error("Category not exists status:400")
    }

    await archiveActivityRepository.delete({ category: category_id })
    await answerRepository.delete({ category: category_id })
    await questionRepository.delete({ category: category_id })
    await activitiesRepository.delete({ category: category_id })
    await categoryRepository.delete({ id: category_id })

    return
  }
}
export default new DeleteCategoryService()