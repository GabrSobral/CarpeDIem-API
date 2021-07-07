import { Request, Response } from "express";
import ListActivitiesForMeService from "../../services/ActivitiesOfTheDay/ListActivitiesForMeService";

class ListActivitiesForMeController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id

    const myActivities = await ListActivitiesForMeService.execute(user_id)

    return response.json(myActivities)
  }
}
export default new ListActivitiesForMeController()