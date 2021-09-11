import { Request, Response } from 'express'
import handleGetRepositories from '../../utils/handleGetRepositories'

class DeleteUser {
  async handle(request: Request, response: Response) {
    const { id } = request.params
    const { userRepository } = handleGetRepositories()

    await userRepository.delete(id)

    return response.sendStatus(200)
  }
}
export default new DeleteUser().handle