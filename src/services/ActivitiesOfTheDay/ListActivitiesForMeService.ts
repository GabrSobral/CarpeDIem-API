import { getCustomRepository } from "typeorm";
import { ActivitiesOfTheDay } from "../../entities/ActivitiesOfTheDay";
import { Activity } from "../../entities/Activity";
import { Answer } from "../../entities/Answer";
import { ActivitiesOfTheDayRepository } from "../../repositories/ActivitiesOfTheDayRepository";
import { ActivityRepository } from "../../repositories/ActivityRepository.";
import { AnswerRepository } from "../../repositories/AnswerRepository";
import { UserRepository } from "../../repositories/UserRepository";

class ListActivitiesForMeService{
  async execute(user: string){
    const quantityOfActivitiesInList = 2
    const filteredActivities = [] as Activity[]
    const orderedActivities = [] as Activity[]
    const includedActivityIndex = [] as number[]
    const answersSum = []
    let currentAnswerSum = 0
    let previousAnswerSum = 0

    const { userRepository, answerRepository, activitiesRepository } = this.handleGetRepositories()

    const userData = await userRepository.findOne(user)

    if(!userData){
      throw new Error("User not found status:400")}
    
    const userAnswers = await answerRepository
    .createQueryBuilder("answer")
    .where("answer.user = :user", { user })
    .getMany()
    
    if(userAnswers.length === 0){
      throw new Error("User dont have answers yet status:400")}

    const allActivities = await activitiesRepository.find()

    userAnswers.forEach(( item ) => {
      currentAnswerSum = Number(item.answer)
      answersSum.push(previousAnswerSum + currentAnswerSum)
      previousAnswerSum = currentAnswerSum
    })

    for (let index = 0; index < quantityOfActivitiesInList; index++) {
      const currentCategory = this.handleRandomCategory(
        answersSum,
        userAnswers
      )

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
    
    await this.handleSaveActivitiesInDB(orderedActivities, user)
    
    return orderedActivities
  }

  handleRandomCategory(answersSum: number[], userAnswers: Answer[]){
    const random = Math.round(Math.random() * answersSum[answersSum.length - 1])
    let currentCategory = ""

    for(let i = 0; i < answersSum.length; i++){
      if(i === 0){
        if(random <= answersSum[i]){ 
          currentCategory = userAnswers[i].category 
          break
        }
      }

      if(random > answersSum[i] && random <= answersSum[i + 1]){
        currentCategory = userAnswers[i + 1].category
        break
      }

      if(random <= answersSum[i]){
        currentCategory = userAnswers[i].category
        break
      }
    }
    return currentCategory
  }

  async handleSaveActivitiesInDB(orderedActivities: Activity[], user: string){
    const { activitiesOfTheDayRepository } = this.handleGetRepositories()
    const currentDate = new Date().toUTCString()
    
    await activitiesOfTheDayRepository
    .createQueryBuilder()
    .delete()
    .from(ActivitiesOfTheDay)
    .where('destined_to = :user', { user })
    .execute()

    for (let index = 0; index < orderedActivities.length; index++) {
      const activity = orderedActivities[index].id
      const destined_to = user

      const activitiesOfTheDay = activitiesOfTheDayRepository.create({
        activity, destined_to, date: currentDate
      })
      await activitiesOfTheDayRepository.save(activitiesOfTheDay)
    }
  }

  handleGetRepositories(){
    const userRepository = getCustomRepository(UserRepository)
    const answerRepository = getCustomRepository(AnswerRepository)
    const activitiesRepository = getCustomRepository(ActivityRepository)
    const activitiesOfTheDayRepository = getCustomRepository(ActivitiesOfTheDayRepository)

    const repositories = {
      userRepository,
      answerRepository,
      activitiesRepository,
      activitiesOfTheDayRepository
    }
    return repositories
  }
}
export default new ListActivitiesForMeService()