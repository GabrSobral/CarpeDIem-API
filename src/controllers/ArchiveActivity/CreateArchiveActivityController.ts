import { Request, Response } from "express";
import CreateArchiveActivityService from "../../services/ArchiveActivity/CreateArchiveActivityService";

class CreateArchiveActivityController {
  async handle(request: Request, response: Response){
    const { activity, archive } = request.body

    const archiveActivity = await CreateArchiveActivityService.execute(
      { activity_id: activity, archive_id: archive })

    return response.json(archiveActivity)
  }
}
export default new CreateArchiveActivityController()