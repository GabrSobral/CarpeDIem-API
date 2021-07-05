import { getCustomRepository } from "typeorm";
import { AnswerRepository } from "../../repositories/AnswerRepository";

interface ListMyAnswersServiceProps {
  user: string;
}

class ListMyAnswersService {
  async execute({ user }: ListMyAnswersServiceProps){
    const repository = getCustomRepository(AnswerRepository)

    console.log(user)
    const myAnswers = await repository
    .createQueryBuilder("answer")
    .where("answer.user = :user", { user })
    .getMany()

    return myAnswers
  }
}
export default new ListMyAnswersService()