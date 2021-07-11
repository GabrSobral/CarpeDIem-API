import { Request, Response } from "express";
import FinishAnActivityService from "../../services/ActivitiesOfTheDay/FinishAnActivityService";

class FinishAnActivityController {
  async handle(request: Request, response: Response){
    const user = request.user_id
    const activity = request.params.id

    await FinishAnActivityService.execute({ user, activity })

    return response.sendStatus(200)
  }
}
export default new FinishAnActivityController().handle