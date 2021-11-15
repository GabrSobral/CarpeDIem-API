import { User } from "../../../entities/User"
import handleGetRepositories from "../../../utils/handleGetRepositories"

class handleVerifyAcivityValidity{
  async execute(user: User){
    const { userRepository } = handleGetRepositories()
    const currentDate = new Date()

    if(!user.last_activity_request){
      await userRepository.update({ id: user.id }, { last_activity_request: currentDate })
      return
    }
    
    // const validityDate = new Date(
    //   user.last_activity_request.getFullYear(),   //year
    //   user.last_activity_request.getMonth(),      //month
    //   user.last_activity_request.getDate() + 1,   //day
    //   0,                                          //hours
    //   1,                                          //minutes
    //   0                                           //seconds
    // )

    const fewMinutes = new Date(
      user.last_activity_request.getFullYear(),
      user.last_activity_request.getMonth(),
      user.last_activity_request.getDate(),
      user.last_activity_request.getHours(),
      user.last_activity_request.getMinutes() + 5,
      user.last_activity_request.getSeconds()
    )
      
    if( currentDate.getTime() < fewMinutes.getTime() ) {
      throw new Error("You already request the activities, try again tomorrow status:400")}
    
    await userRepository.update({ id: user.id }, { last_activity_request: currentDate })
  }
}
export default new handleVerifyAcivityValidity().execute