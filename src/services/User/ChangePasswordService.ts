import { compare, hash } from "bcryptjs"
import handleGetRepositories from "../../utils/handleGetRepositories"

class ChangePasswordService {
  async execute(oldPassword: string, newPassword: string, user_id: string) {
    const { userRepository } = handleGetRepositories()

    const user = await userRepository.findOne(
      { id: user_id }, 
      { select: ['password'] })

    const isPasswordCorrect = await compare(oldPassword, user.password)

    if(!isPasswordCorrect)
      throw new Error("Your current password is wrong status:400")

    const encryptedNewPassword = await hash(newPassword, 10)

    await userRepository.update(user_id, { password: encryptedNewPassword })

    return
  }
}
export default new ChangePasswordService()