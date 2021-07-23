import { Request, Response } from "express";
import DeleteFeedbackService from "../../services/Feedback/DeleteFeedbackService";

class DeleteFeedbackController {
  async handle(request: Request, response: Response) {
    const activity_id = request.params.id
    const user_id = request.user_id

    await DeleteFeedbackService.execute({ user_id, activity_id })

    return response.sendStatus(200)
  }
}
export default new DeleteFeedbackController()