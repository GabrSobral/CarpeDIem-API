import { Request, Response } from "express";
import ChangeActivityService from "../../services/Activity/ChangeActivityService";

class ChangeActivityController {
  async handle(request: Request, response: Response){
    const { title, description, body, category } = request.body
    const user_id = request.user_id;
    const id = request.params.id

    const activityUpdated = await ChangeActivityService.execute({
      id, title, description, body, category, user_id
    })

    return response.json(activityUpdated)
  }
}
export default new ChangeActivityController()