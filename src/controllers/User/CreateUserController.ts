import { Request, Response } from "express";
import CreateUserService from "../../services/User/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response){
    const { name, email, password, role } = request.body;

    const user = await CreateUserService.execute({ name, email, password, role })

    return response.json(user)
  }
}

export default new CreateUserController()

