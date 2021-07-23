import { Request, Response } from "express";
import ListMyFeedbacksService from "../../services/Feedback/ListMyFeedbacksService";

class ListMyFeedbacksController {
  async handle(request: Request, response: Response){
    const user_id = request.user_id

    const myFeedbacks = await ListMyFeedbacksService.execute(user_id)

    return response.json(myFeedbacks)
  }
}
export default new ListMyFeedbacksController()