import { Request, response, Response } from "express";
import ChangeUserDataservice from "../../services/User/ChangeUserDataservice";

class ChangeUserDataController {
  async handle(request: Request, response: Response){
    const user_id = request.user_id

    const user = await ChangeUserDataservice.execute(
      user_id,
      request.body
    )
    
    return response.json(user)
  }
}
export default new ChangeUserDataController()