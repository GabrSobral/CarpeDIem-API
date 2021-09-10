import { Request, Response } from "express";
import ResetPasswordService from "../../services/User/ResetPasswordService";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { email, newPassword, token } = request.body

    await ResetPasswordService.execute(newPassword, email, token)

    return response.sendStatus(200)
  }
}
export default new ResetPasswordController()