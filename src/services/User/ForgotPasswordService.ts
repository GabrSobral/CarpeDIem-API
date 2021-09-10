import { randomBytes } from 'crypto'
import SendEmail from '../../modules/mailer'
import handleGetRepositories from "../../utils/handleGetRepositories"

class ForgotPasswordService {
  async execute(email: string) {
    const { userRepository } = handleGetRepositories()

    const user = await userRepository.findOne({ email })

    if(!user) {
      throw new Error('User not found status:400')
    }

    const token = randomBytes(20).toString('hex')
    const currentDate = new Date()

    await userRepository.update(user.id, { 
      password_reset_expires: currentDate,
      password_reset_token: token
    })

    await SendEmail(email, token)

    return
  }
}
export default new ForgotPasswordService()