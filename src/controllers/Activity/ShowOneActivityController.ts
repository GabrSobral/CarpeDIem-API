import { Request, Response } from "express";
import ShowOneActivityService from "../../services/Activity/ShowOneActivityService ";

class ShowOneActivityController {
  async handle(request: Request, response: Response) {
    const id = request.params.id
    const user_id = request.user_id

    const formattedActivity = await ShowOneActivityService.execute(id, user_id)

    return response.json(formattedActivity)
  }
}
export default new ShowOneActivityController()