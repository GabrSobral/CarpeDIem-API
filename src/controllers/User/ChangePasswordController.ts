import { Request, Response } from "express";
import ChangePasswordService from "../../services/User/ChangePasswordService";

class ChangePasswordController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id
    const { oldPassword, newPassword } = request.body

    await ChangePasswordService.execute(oldPassword, newPassword, user_id)

    return response.sendStatus(200)
  }
}
export default new ChangePasswordController()