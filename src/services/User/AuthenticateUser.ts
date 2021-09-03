import { compare } from "bcryptjs"
import handleGetRepositories from "../../utils/handleGetRepositories"
import handleGenerateToken from "./handleGenerateToken"

interface IAuthenticateUser {
  email: string;
  password: string
}

class AuthenticateUser {
  async execute({ email, password }: IAuthenticateUser){
    const { userRepository } = handleGetRepositories()

    email = email.toLowerCase()

    const user = await userRepository.findOne(
      { email }, 
      { select: [
        "id", 
        "password", 
        'email', 
        'name', 
        'created_at', 
        'updated_at',
        'quantity_of_activities',
        'activities_finished_today',
        'all_activities_finished'
      ] })

    if(!user){
      throw new Error("Email/password invalid status:400")
    }
    if(!await compare(password, user.password)){
      throw new Error('Email/password invalid status:400')
    }
    
    const token = handleGenerateToken(user)
    delete user.password

    return { user, token }
  }
}

export default new AuthenticateUser()