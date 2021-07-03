import { Request, Response } from "express";
import AuthenticateUser from "../../services/User/AuthenticateUser";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const { user, token } = await AuthenticateUser.execute({ email, password })

    return response.json({ user, token })
  }
}

export default new AuthenticateUserController()