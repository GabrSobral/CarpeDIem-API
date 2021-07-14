import { Request, Response } from "express";
import ShowOneActivityService from "../../services/Activity/ShowOneActivityService ";

class ShowOneActivityController {
  async handle(request: Request, response: Response) {
    const id = request.params.id

    const formattedActivity = await ShowOneActivityService.execute(id)

    return response.json(formattedActivity)
  }
}
export default new ShowOneActivityController()