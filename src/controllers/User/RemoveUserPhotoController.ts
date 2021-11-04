import { Request, Response } from "express";
import RemoveUserPhoto from "../../services/User/RemoveUserPhoto";

class RemoveUserPhotoController {
  async handle(request: Request, response: Response){
    const user_id = request.user_id

    const user = await RemoveUserPhoto.execute(user_id)

    return response.send(user)
  }
}
export default new RemoveUserPhotoController()