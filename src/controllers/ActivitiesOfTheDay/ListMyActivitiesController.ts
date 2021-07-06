import { Request, Response } from "express";
import ListMyActivitiesService from "../../services/ActivitiesOfTheDay/ListMyActivitiesService";

class ListMyActivitiesController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id

    const myActivities = await ListMyActivitiesService.execute(user_id)

    return response.json(myActivities)
  }
}
export default new ListMyActivitiesController()