import { Request, Response } from "express";
import DeleteMyActivityService from "../../services/ActivitiesOfTheDay/DeleteMyActivityService";

class DeleteMyActivityController {
  async handle(request: Request, response: Response){
    const user = request.user_id
    const activity = request.params.id

    await DeleteMyActivityService.execute({ user, activity })

    return response.sendStatus(200)
  }
}
export default new DeleteMyActivityController()