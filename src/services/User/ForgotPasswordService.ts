import { randomBytes } from 'crypto'
import SendEmail from '../../modules/mailer'
import handleGetRepositories from "../../utils/handleGetRepositories"

class ForgotPasswordService {
  async execute(email: string) {
    const { userRepository } = handleGetRepositories()
    const emailLowercase = email.toLowerCase()

    const user = await userRepository.findOne({ email: emailLowercase })

    if(!user) {
      throw new Error('User not found status:400')
    }

    const token = randomBytes(20).toString('hex')
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() + 1)

    await userRepository.update(user.id, { 
      password_reset_expires: currentDate,
      password_reset_token: token
    })

    await SendEmail(emailLowercase, token)

    return
  }
}
export default new ForgotPasswordService()