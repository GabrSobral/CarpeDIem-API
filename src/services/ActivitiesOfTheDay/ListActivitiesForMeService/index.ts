import { Activity } from "../../../entities/Activity"
import handleGetRepositories from "./handleGetRepositories"
import handlePutFilesInActivities from "./handlePutFilesInActivities"
import handleRandomCategory from "./handleRandomCategory"
import handleSaveActivitiesInDB from "./handleSaveActivitiesInDB"

class ListActivitiesForMeService{
  async execute(user: string){
    const quantityOfActivitiesInList = 2
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
    } = handleGetRepositories()

    const userData = await userRepository.findOne(user)

    if(!userData){ throw new Error("User not found status:400") }
    
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