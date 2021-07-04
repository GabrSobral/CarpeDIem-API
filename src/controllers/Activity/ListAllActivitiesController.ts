import { Request, Response } from "express";
import ListAllActivitiesService from "../../services/Activity/ListAllActivitiesService";

class ListAllActivitiesController {
  async handle(request: Request, response: Response){
    const allActivities = await ListAllActivitiesService.execute()

    return response.json(allActivities)
  }
}
export default new ListAllActivitiesController()