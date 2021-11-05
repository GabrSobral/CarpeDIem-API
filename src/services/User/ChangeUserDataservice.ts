import { User } from "../../entities/User"
import handleGetRepositories from "../../utils/handleGetRepositories"
import handleDeleteFromCloud from "../Archive/handleDeleteFromCloud"
import handleUploadFile from "../Archive/handleUploadFile"

interface ChangeUserDataServiceProps {
  user_id: string;
  body: any;
  photo: Express.Multer.File;
}

class ChangeUserDataService {
  async execute({user_id, body, photo}: ChangeUserDataServiceProps){
    const { userRepository } = handleGetRepositories()

    const user = await userRepository.findOne( user_id )
    
    let newuser: User = { ...user, ...body }

    if(photo) {
      if(user.photo_url)
        throw new Error("User already photo")

      await handleDeleteFromCloud.execute(user.photo_public_id)
      const fileData = await handleUploadFile(photo)
      newuser.photo_url = photo.path;
      newuser.photo_public_id = fileData.public_id;
    }

    await userRepository.update(user.id, newuser)

    delete newuser.photo_public_id
    
    return newuser
  }
}
export default new ChangeUserDataService()