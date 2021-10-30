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

    const token = String(Math.floor(1000 + Math.random() * 9000));
    const currentDate = new Date()
    currentDate.setHours(currentDate.getHours() + 1)

    await userRepository.update(user.id, { 
      password_reset_expires: currentDate,
      password_reset_token: token
    })
    const firstName = user.name.split(' ')[0]
    await SendEmail(emailLowercase, token, firstName)

    return
  }
}
export default new ForgotPasswordService()