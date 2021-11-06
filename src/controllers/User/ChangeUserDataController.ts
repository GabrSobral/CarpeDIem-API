import { Request, Response } from "express";
import ChangeUserDataservice from "../../services/User/ChangeUserDataservice";

class ChangeUserDataController {
  async handle(request: Request, response: Response){
    const user_id = request.user_id;
    const userPhoto = request.file as Express.Multer.File;

    console.log(userPhoto)

    const user = await ChangeUserDataservice.execute({
      user_id,
      body: request.body,
      photo: userPhoto,
    })
    
    return response.json(user);
  }
}
export default new ChangeUserDataController()