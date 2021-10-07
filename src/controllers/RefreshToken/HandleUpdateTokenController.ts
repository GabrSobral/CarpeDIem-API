import { Request, Response } from "express";
import HandleUpdateToken from "../../services/RefreshToken/HandleUpdateToken";

class HandleUpdateTokenController {
  async handle(request: Request, response: Response){
    const { refresh_token } = request.body

    const token = await HandleUpdateToken.execute(refresh_token)

    return response.json(token)
  }
}
export default new HandleUpdateTokenController()