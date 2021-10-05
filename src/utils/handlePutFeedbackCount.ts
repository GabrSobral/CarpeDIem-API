import { Activity } from "../entities/Activity"
import handleGetRepositories from "./handleGetRepositories"

class handlePutFeedbackCount {
  async execute(item: Activity){
    const { feedbackRepository } = handleGetRepositories()

    const badCount = await feedbackRepository
      .createQueryBuilder('feedback')
      .select("feedback.feedback")
      .where("feedback.activity = :id", { id: item.id })
      .andWhere("feedback.feedback = false")
      .getCount()

    const goodCount = await feedbackRepository
      .createQueryBuilder('feedback')
      .select("feedback.feedback")
      .where("feedback.activity = :id", { id: item.id })
      .andWhere("feedback.feedback = true")
      .getCount()

    return { goodCount, badCount }
  }
}
export default new handlePutFeedbackCount().execute