import handleGetRepositories from "../../utils/handleGetRepositories";

interface ListMyAnswersServiceProps {
  user: string;
}

class ListMyAnswersService {
  async execute({ user }: ListMyAnswersServiceProps){
    const { answerRepository } = handleGetRepositories()

    console.log(user)
    const myAnswers = await answerRepository
    .createQueryBuilder("answer")
    .where("answer.user = :user", { user })
    .getMany()

    return myAnswers
  }
}
export default new ListMyAnswersService()