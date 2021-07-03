import { Request, Response } from "express";
import ListUserService from "../../services/User/ListUserService";

class ListUsersController {
  async handle(request: Request, response: Response){
    const users = await ListUserService.execute()

    return response.json(users)
  }
}

export default new ListUsersController()