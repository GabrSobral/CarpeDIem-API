import { getCustomRepository } from "typeorm"
import { QuestionRepository } from "../../repositories/QuestionRepository"

interface CreateQuestionServiceProps {
  body: string;
  category: string
}

class CreateQuestionService {
  async execute({ body, category }: CreateQuestionServiceProps){
    const repository = getCustomRepository(QuestionRepository)

    const question = repository.create({ body, category })
    repository.save(question)

    return question
  }
}
export default new CreateQuestionService()