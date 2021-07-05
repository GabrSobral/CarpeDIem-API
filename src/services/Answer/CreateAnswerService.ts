import { getCustomRepository } from "typeorm";
import { AnswerRepository } from "../../repositories/AnswerRepository";

interface CreateAnswerServiceProps {
  user: string;
  category: string;
  question: string;
  answer: string;
}

class CreateAnswerService {
  async execute({ user, category, question, answer }: CreateAnswerServiceProps){
    const answerRepository = getCustomRepository(AnswerRepository)

    const isAlreadyAnswered = await answerRepository.findOne({ where: [user, question] })
    console.log(isAlreadyAnswered)

    const newAnswer = answerRepository.create({ user, category, question, answer })
    await answerRepository.save(newAnswer)

    return newAnswer
  }
}
export default new CreateAnswerService()