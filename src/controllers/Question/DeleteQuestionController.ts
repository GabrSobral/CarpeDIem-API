import { Request, Response } from "express";
import DeleteQuestionService from "../../services/Question/DeleteQuestionService";

class DeleteQuestionController{
  async handle(request: Request, response: Response){
    const question_id = request.params.id

    await DeleteQuestionService.execute(question_id)

    return response.sendStatus(200)
  }
}
export default new DeleteQuestionController()