import { Request, Response } from "express";
import DeleteActivityService from "../../services/Activity/DeleteActivityService";

class DeleteActivityController {
  async handle(request: Request, response: Response){
    const id = request.params.id

    await DeleteActivityService.execute(id)

    return response.sendStatus(200)
  }
}
export default new DeleteActivityController()