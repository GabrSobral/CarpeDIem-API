import { Request, Response } from "express";
import CreateAnswerService from "../../services/Answer/CreateAnswerService";

class CreateAnswerController {
  async handle(request: Request, response: Response){
    const user = request.user_id
    const answers = request.body

    const myAnswer = await CreateAnswerService.execute(
      { user, answers }
    )

    return response.json(myAnswer)
  }
}
export default new CreateAnswerController()