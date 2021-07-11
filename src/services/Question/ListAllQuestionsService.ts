import handleGetRepositories from "../../utils/handleGetRepositories";

class ListAllQiestionsService {
  async execute(){
    const { questionRepository } = handleGetRepositories()
    
    const AllQuestions = await questionRepository.find()

    return AllQuestions
  }
}
export default new ListAllQiestionsService()