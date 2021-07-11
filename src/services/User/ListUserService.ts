import handleGetRepositories from "../../utils/handleGetRepositories";

class ListUserService{ 
  async execute(){
    const { userRepository } = handleGetRepositories()
    const users = await userRepository.find()

    return users
  }
}

export default new ListUserService()