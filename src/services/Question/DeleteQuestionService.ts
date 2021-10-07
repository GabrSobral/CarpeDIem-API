import { Answer } from "../../entities/Answer"
import { Question } from "../../entities/Question"
import handleGetRepositories from "../../utils/handleGetRepositories"

class DeleteQuestionService{
  async execute(question_id: string){
    const { answerRepository, questionRepository } = handleGetRepositories()

    const questionExists = await questionRepository.findOne({ where: {id : question_id} })

    if(!questionExists)
      throw new Error("Question not exists status:400")

    await answerRepository.delete({ question: question_id })
    await questionRepository.delete({ id: question_id })

    return
  }
}
export default new DeleteQuestionService()