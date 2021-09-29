import handleGetRepositories from "../../../utils/handleGetRepositories"

class handleVerifyAcivityValidity{
  async execute(user: string){
    const { userRepository } = handleGetRepositories()
    const currentDate = new Date()

    const userData = await userRepository.findOne({ id: user })

    if(!userData.last_activity_request){
      await userRepository.update({ id: user }, { last_activity_request: currentDate })
      return
    }

    // const validityDate = new Date(
    //   activityOfTheDay[0].date.getFullYear(),     //year
    //   activityOfTheDay[0].date.getMonth(),        //month
    //   activityOfTheDay[0].date.getDate() + 1,     //day
    //   0,                                          //hours
    //   1,                                          //minutes
    //   0                                           //seconds
    // )

    const fewMinutes = new Date(
      userData.last_activity_request.getFullYear(),
      userData.last_activity_request.getMonth(),
      userData.last_activity_request.getDate(),
      userData.last_activity_request.getHours(),
      userData.last_activity_request.getMinutes() + 5,
      userData.last_activity_request.getSeconds()
    )

    if( currentDate.getTime() < fewMinutes.getTime() ) {
      throw new Error("You already request the activities, try again tomorrow status:400")}

    await userRepository.update({ id: user }, { last_activity_request: currentDate })
  }
}
export default new handleVerifyAcivityValidity().execute