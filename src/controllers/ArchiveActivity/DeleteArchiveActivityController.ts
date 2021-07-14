import { Request, Response } from "express";
import DeleteArchiveActivityService from "../../services/ArchiveActivity/DeleteArchiveActivityService";

class DeleteArchiveActivityController {
  async handle(request: Request, response: Response){
    const activity = request.params.id

    await DeleteArchiveActivityService.execute(activity)

    return response.sendStatus(200)
  }
}
export default new DeleteArchiveActivityController()