import handleGetRepositories from "../../utils/handleGetRepositories"

interface ChangeUserDataServiceProps {
  user_id: string;
}

class ChangeUserDataService {
  async execute(user_id: string, ...args: any){
    const { userRepository } = handleGetRepositories()
    let user = await userRepository.findOne( user_id )
    
    const newuser = { ...user, ...args[0] }
    await userRepository.save(newuser)
    return newuser
  }
}
export default new ChangeUserDataService()