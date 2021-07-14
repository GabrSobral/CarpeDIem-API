import { Request, Response } from "express";
import ListAllArchiveActivityService from "../../services/ArchiveActivity/ListAllArchiveActivityService";

class ListAllArchiveActivityController {
  async handle(request: Request, response: Response){
    const allArchiveActivities = await ListAllArchiveActivityService.execute()

    return response.json(allArchiveActivities)
  }
}
export default new ListAllArchiveActivityController()