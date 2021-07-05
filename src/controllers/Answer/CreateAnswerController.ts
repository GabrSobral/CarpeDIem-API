import { Request, Response } from "express";
import CreateAnswerService from "../../services/Answer/CreateAnswerService";

class CreateAnswerController {
  async handle(request: Request, response: Response){
    const user = request.user_id
    const { question, answer } = request.body

    const myAnswer = await CreateAnswerService.execute(
      { user, question, answer }
    )

    return response.json(myAnswer)
  }
}
export default new CreateAnswerController()