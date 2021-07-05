import { Request, Response } from "express";
import ListMyAnswersService from "../../services/Answer/ListMyAnswersService";

class ListMyAnswersController {
  async handle(request: Request, response: Response){
    const myId = request.user_id
    
    const myAnswers = await ListMyAnswersService.execute({ user: myId })

    return response.json(myAnswers)
  }
}
export default new ListMyAnswersController();