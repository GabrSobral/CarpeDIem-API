import { Request, Response } from "express";
import ListAllActivitiesService from "../../services/Activity/ListAllActivitiesService";

class ListAllActivitiesController {
  async handle(request: Request, response: Response){
    const user_id = request.user_id
    const allActivities = await ListAllActivitiesService.execute(user_id)

    return response.json(allActivities)
  }
}
export default new ListAllActivitiesController()