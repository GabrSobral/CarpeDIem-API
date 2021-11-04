import { Request, Response } from "express";
import CreateUserService from "../../services/User/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response){
    const { name, email, password, role } = request.body;
    const userPhoto = request.file as Express.Multer.File;

    const user = await CreateUserService.execute({ 
      name, 
      email, 
      password, 
      role, 
      photo_url: userPhoto 
    })

    return response.json(user)
  }
}

export default new CreateUserController()