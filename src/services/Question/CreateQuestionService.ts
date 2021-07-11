import handleGetRepositories from "../../utils/handleGetRepositories"

interface CreateQuestionServiceProps {
  body: string;
  category: string
}

class CreateQuestionService {
  async execute({ body, category }: CreateQuestionServiceProps){
    const { questionRepository } = handleGetRepositories()

    const question = questionRepository.create({ body, category })
    questionRepository.save(question)

    return question
  }
}
export default new CreateQuestionService()