import { Request, Response } from "express";
import CreateActivityService from "../../services/Activity/CreateActivityService";

class CreateActivityController {
  async handle(request: Request, response: Response){
    const { title, description, category, body } = request.body
    const user_id = request.user_id

    const activity = await CreateActivityService.execute(
      { title, description, category, body, user_id }
    )

    return response.json(activity)
  }
}
export default new CreateActivityController()