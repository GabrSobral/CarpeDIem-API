import handleGetRepositories from "../../../utils/handleGetRepositories"

class handleVerifyAcivityValidity{
  async execute(user: string){
    const { activitiesOfTheDayRepository } = handleGetRepositories()

    const activityOfTheDay = await activitiesOfTheDayRepository
    .createQueryBuilder('activity')
    .where('activity.destined_to = :user', { user })
    .getMany()

    if(activityOfTheDay.length === 0){
      return
    }

    const currentDate = new Date()

    // const validityDate = new Date(
    //   activityOfTheDay[0].date.getFullYear(),     //year
    //   activityOfTheDay[0].date.getMonth(),        //month
    //   activityOfTheDay[0].date.getDate() + 1,     //day
    //   0,                                          //hours
    //   1,                                          //minutes
    //   0                                           //seconds
    // )

    const OneMinute = new Date(
      activityOfTheDay[0].date.getFullYear(),
      activityOfTheDay[0].date.getMonth(),
      activityOfTheDay[0].date.getDate(),
      activityOfTheDay[0].date.getHours(),
      activityOfTheDay[0].date.getMinutes() + 1,
      activityOfTheDay[0].date.getSeconds()
    )

    if( currentDate.getTime() < OneMinute.getTime() ){
      throw new Error("You already request the activities, try again tomorrow status:400")}
  }
}
export default new handleVerifyAcivityValidity().execute