import { Request, Response } from "express";
import ForgotPasswordService from "../../services/User/ForgotPasswordService";

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body

    await ForgotPasswordService.execute(email)

    return response.sendStatus(200)
  }
}
export default new ForgotPasswordController()