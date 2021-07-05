import { getCustomRepository } from "typeorm";
import { AnswerRepository } from "../../repositories/AnswerRepository";
import { QuestionRepository } from "../../repositories/QuestionRepository";

interface CreateAnswerServiceProps {
  user: string;
  question: string;
  answer: string;
}

class CreateAnswerService {
  async execute({ user, question, answer }: CreateAnswerServiceProps){
    const answerRepository = getCustomRepository(AnswerRepository)
    const questionRepository = getCustomRepository(QuestionRepository)

    const isQuestionExists = await questionRepository.findOne(question)

    if(!isQuestionExists){
      throw new Error("This question not exist status:400")
    }
    const category = isQuestionExists.category

    const isAlreadyAnswered = await answerRepository
    .createQueryBuilder('answer')
    .where('answer.user = :user', { user })
    .andWhere('answer.question = :question', { question })
    .getOne()

    if(isAlreadyAnswered){
      isAlreadyAnswered.answer = answer
      await answerRepository.save(isAlreadyAnswered)

      return isAlreadyAnswered
    }

    const newAnswer = answerRepository.create({ user, category, question, answer })
    await answerRepository.save(newAnswer)

    return newAnswer
  }
}
export default new CreateAnswerService()