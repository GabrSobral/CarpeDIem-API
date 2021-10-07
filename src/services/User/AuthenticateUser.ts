import { compare } from "bcryptjs"
import { User } from "../../entities/User"
import handleGenerateRefreshToken from "../../utils/handleGenerateRefreshToken"
import handleGetRepositories from "../../utils/handleGetRepositories"
import handleGenerateToken from "./handleGenerateToken"

interface IAuthenticateUser {
  email: string;
  password: string
}
interface IUser extends User{
  hasAnswered: boolean
}

class AuthenticateUser {
  async execute({ email, password }: IAuthenticateUser){
    const { userRepository, answerRepository, refreshTokenRepository } = handleGetRepositories()

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
      ] }) as IUser

    if(!user)
      throw new Error("Email/password invalid status:400")

    if(!await compare(password, user.password))
      throw new Error('Email/password invalid status:400')
    
    const token = handleGenerateToken(user.id)
    await refreshTokenRepository.delete({ user_id: user.id })
    const refreshToken = await handleGenerateRefreshToken(user.id)

    delete user.password

    const hasAnswers = await answerRepository.findOne({ where: { user: user.id }})
    user.hasAnswered = hasAnswers ? true : false

    return { user, token, refreshToken }
  }
}

export default new AuthenticateUser()