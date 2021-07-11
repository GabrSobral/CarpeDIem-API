import { Activity } from "../../../entities/Activity"
import handleGetRepositories from "../../../utils/handleGetRepositories"
import handlePutFilesInActivities from "./handlePutFilesInActivities"
import handleRandomCategory from "./handleRandomCategory"
import handleSaveActivitiesInDB from "./handleSaveActivitiesInDB"

class ListActivitiesForMeService{
  async execute(user: string){
    const filteredActivities = [] as Activity[]
    const orderedActivities = [] as Activity[]
    const includedActivityIndex = [] as number[]
    const answersSum = []
    let currentAnswerSum = 0
    let previousAnswerSum = 0

    const { 
      userRepository, 
      answerRepository, 
      activitiesRepository,
      activitiesOfTheDayRepository
    } = handleGetRepositories()

    const activityOfTheDay = await activitiesOfTheDayRepository
    .createQueryBuilder('activity')
    .where('activity.destined_to = :user', { user })
    .getMany()

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

    if( currentDate.getTime() < OneMinute.getTime() )
        throw new Error("You already request the activities, try again tomorrow")

    const userData = await userRepository.findOne(user)

    if(!userData){ throw new Error("User not found status:400") }
    const quantityOfActivitiesInList = userData.quantity_of_activities
    
    const userAnswers = await answerRepository
    .createQueryBuilder("answer")
    .where("answer.user = :user", { user })
    .getMany()
    
    if(userAnswers.length === 0){ 
      throw new Error("User dont have answers yet status:400") }

    const allActivities = await activitiesRepository.find()

    userAnswers.forEach(( item ) => {
      currentAnswerSum = Number(item.answer)
      answersSum.push(previousAnswerSum + currentAnswerSum)
      previousAnswerSum = currentAnswerSum
    })

    for (let index = 0; index < quantityOfActivitiesInList; index++) {
      const currentCategory = handleRandomCategory(answersSum, userAnswers)

      allActivities.forEach((item) => {
        if(filteredActivities.indexOf(item) !== -1) { return }

        if(currentCategory === item.category){
          filteredActivities.push(item)
        }
      })

      const max = filteredActivities.length -1
      const min = 0
      let random = Math.floor(Math.random() * (max - min + 1) + min)

      const checkIfArrayIsTheSame = (array: Array<any>, target: Array<any>) => target.every(v => array.includes(v))

      if(checkIfArrayIsTheSame(orderedActivities, filteredActivities)){
        index = index - 1
      } else {

        while(orderedActivities.indexOf(filteredActivities[random]) !== -1){
          random = Math.floor(Math.random() * (max - min + 1) + min)
        }
        includedActivityIndex.push(random)
        orderedActivities.push(filteredActivities[random])
      }
    }
    
    const orderedActivitiesWithFiles = await handlePutFilesInActivities(orderedActivities)

    await handleSaveActivitiesInDB(orderedActivities, user)
    
    return orderedActivitiesWithFiles
  }
}
export default new ListActivitiesForMeService()