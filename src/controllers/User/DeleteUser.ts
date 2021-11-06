import { Request, Response } from 'express'
import handleDeleteFromCloud from '../../services/Archive/handleDeleteFromCloud'
import handleGetRepositories from '../../utils/handleGetRepositories'

class DeleteUser {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { userRepository, refreshTokenRepository } = handleGetRepositories()

    const user = await userRepository.findOne({ id })
    if(user.photo_public_id) {
      await handleDeleteFromCloud.execute(user.photo_public_id)
    }
    await refreshTokenRepository.delete({ user_id: id })
    await userRepository.delete(id)

    return response.sendStatus(200)
  }
}
export default new DeleteUser().handle