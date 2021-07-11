import { getCustomRepository } from "typeorm"
import { ActivitiesOfTheDayRepository } from "../repositories/ActivitiesOfTheDayRepository"
import { ActivityRepository } from "../repositories/ActivityRepository."
import { AnswerRepository } from "../repositories/AnswerRepository"
import { ArchiveActivityRepository } from "../repositories/ArchiveActivityRepository"
import { ArchiveRepository } from "../repositories/ArchiveRepository"
import { CategoryRepository } from "../repositories/CategoryRepository"
import { QuestionRepository } from "../repositories/QuestionRepository"
import { UserRepository } from "../repositories/UserRepository"

class handleGetRepositories {
  execute(){
    const userRepository = getCustomRepository(UserRepository)
    const answerRepository = getCustomRepository(AnswerRepository)
    const archiveRepository = getCustomRepository(ArchiveRepository)
    const questionRepository = getCustomRepository(QuestionRepository)
    const categoryRepository = getCustomRepository(CategoryRepository)
    const activitiesRepository = getCustomRepository(ActivityRepository)
    const archiveActivityRepository = getCustomRepository(ArchiveActivityRepository)
    const activitiesOfTheDayRepository = getCustomRepository(ActivitiesOfTheDayRepository)

    const repositories = {
      userRepository,
      answerRepository,
      archiveRepository,
      questionRepository,
      categoryRepository,
      activitiesRepository,
      archiveActivityRepository,
      activitiesOfTheDayRepository
    }
    return repositories
  }
}
export default new handleGetRepositories().execute