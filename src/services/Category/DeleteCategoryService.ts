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

    await archiveActivityRepository
    .createQueryBuilder()
    .delete()
    .from(ArchiveActivity)
    .where('category = :category', { category: category_id })
    .execute()

    await answerRepository
    .createQueryBuilder()
    .delete()
    .from(Answer)
    .where('category = :category', { category: category_id })
    .execute()

    await questionRepository
    .createQueryBuilder()
    .delete()
    .from(Question)
    .where('category = :category', { category: category_id })
    .execute()

    await activitiesRepository
    .createQueryBuilder()
    .delete()
    .from(Activity)
    .where('category = :category', { category: category_id })
    .execute()

    await categoryRepository
    .createQueryBuilder()
    .delete()
    .from(Category)
    .where('id = :category', { category: category_id })
    .execute()

    return
  }
}
export default new DeleteCategoryService()