import handleGetRepositories from "../../utils/handleGetRepositories";

class ListAllQiestionsService {
  async execute(){
    const { questionRepository } = handleGetRepositories()
    
    const AllQuestions = await questionRepository.find({ relations: ["JoinCategory"] })

    const formattedQuestions = AllQuestions.map(item => ({
      id: item.id,
      body: item.body,
      category : {
        id: item.JoinCategory.id,
        name: item.JoinCategory.name
      }
    }))

    return formattedQuestions
  }
}
export default new ListAllQiestionsService()