import handleGetRepositories from "../../utils/handleGetRepositories"
import handleDeleteFromCloud from "../Archive/handleDeleteFromCloud"

class RemoveUserPhoto {
  async execute(user_id: string){
    const { userRepository } = handleGetRepositories()

    const user = await userRepository.findOne({ id: user_id })

    if(!user)
      throw new Error("User not found status:400")

    if(user.photo_url) {
      await handleDeleteFromCloud.execute(user.photo_public_id)
      user.photo_url = undefined;
      user.photo_public_id = undefined;
      await userRepository.update({ id: user_id },{ photo_url: undefined, photo_public_id: undefined })
    }

    return user
  }
}
export default new RemoveUserPhoto()