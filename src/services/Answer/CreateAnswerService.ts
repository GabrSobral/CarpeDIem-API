import { getCustomRepository } from "typeorm";
import { AnswerRepository } from "../../repositories/AnswerRepository";
import { QuestionRepository } from "../../repositories/QuestionRepository";

interface CreateAnswerServiceProps {
  user: string;
  answer: string[];
}

class CreateAnswerService {
  async execute({ user, answer }: CreateAnswerServiceProps){
    const answerRepository = getCustomRepository(AnswerRepository)
    const questionRepository = getCustomRepository(QuestionRepository)

    const questions = await questionRepository.find()

    if(answer.length !== questions.length){
      throw new Error(`You have to answer all questions, ${questions.length - answer.length} remaining status:400`)
    }

    questions.forEach(async (item, index) => {
      const id = item.id
      const itemCategory = item.category
      const answerToSave = answerRepository.create({ 
        question: id, 
        answer: answer[index], 
        user,
        category: itemCategory
       })
      await answerRepository.save(answerToSave)
    })

    return "All questions successfully answered"
  }
}
export default new CreateAnswerService()