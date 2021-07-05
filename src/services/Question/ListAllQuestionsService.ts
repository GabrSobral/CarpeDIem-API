import { getCustomRepository } from "typeorm";
import { QuestionRepository } from "../../repositories/QuestionRepository";

class ListAllQiestionsService {
  async execute(){
    const repository = getCustomRepository(QuestionRepository)
    
    const AllQuestions = await repository.find()

    return AllQuestions
  }
}
export default new ListAllQiestionsService()