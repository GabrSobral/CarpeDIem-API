import { hash } from "bcryptjs"
import handleGetRepositories from "../../utils/handleGetRepositories"

class ResetPasswordService {
  async execute(newPassword: string, email: string, token: string) {
    const { userRepository } = handleGetRepositories()
    const user = await userRepository.findOne(
      { email }, 
      { select: ['id','password_reset_token', 'password_reset_expires'] })

    if(!user) {
      throw new Error('User not found status:400')
    }

    if(user.password_reset_token !== token){
      throw new Error('Password token invalid status:400')
    }

    const currentDate = new Date()
    if(currentDate > user.password_reset_expires) {
      throw new Error('Password Token Expired status:400')
    }

    const encryptedPassword = await hash(newPassword, 10)

    await userRepository.update(user.id, {
      password: encryptedPassword,
      password_reset_expires: null,
      password_reset_token: null
    })

    return
  }
}
export default new ResetPasswordService()