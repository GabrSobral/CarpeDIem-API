import { Answer } from "../../entities/Answer"
import { Question } from "../../entities/Question"
import handleGetRepositories from "../../utils/handleGetRepositories"

class DeleteQuestionService{
  async execute(question_id: string){
    const {
      answerRepository,
      questionRepository,

    } = handleGetRepositories()

    const questionExists = await questionRepository.findOne({ where: {id : question_id} })

    if(!questionExists){
    throw new Error("Question not exists status:400")
    }

    await answerRepository
    .createQueryBuilder()
    .delete()
    .from(Answer)
    .where('question = :question', { question: question_id })
    .execute()

    await questionRepository
    .createQueryBuilder()
    .delete()
    .from(Question)
    .where('id = :question', { question: question_id })
    .execute()

    return
  }
}
export default new DeleteQuestionService()