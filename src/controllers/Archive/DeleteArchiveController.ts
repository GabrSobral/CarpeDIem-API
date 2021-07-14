import { Request, Response } from "express"
import DeleteArchiveService from "../../services/Archive/DeleteArchiveService"

class DeleteArchiveController{
  async handle(request: Request, response: Response){
    const archive_id = request.params.id

    await DeleteArchiveService.execute(archive_id)

    return response.sendStatus(200)
  }
}
export default new DeleteArchiveController()