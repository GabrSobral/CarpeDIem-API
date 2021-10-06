import handleGetRepositories from "../../../utils/handleGetRepositories"
import { Answer } from '../../../entities/Answer'

class handleAnswersSum {
  async execute(user_id: string, hasFeedback = false) {
    const { answerRepository } = handleGetRepositories()

    const answers = await answerRepository.find({ where: { user: user_id } })

    if(answers.length === 0)
      throw new Error('User dont have answers yet status:400');

    hasFeedback && answers.push({ category: 'FEEDBACK', answer: "5"} as Answer)

    let init = 0

    const answersSum = answers.map(answer => {
      const currentSum = init + Number(answer.answer)
      const answerRange = [init, currentSum]
      init = currentSum + 1

      return { 
        category: answer.category,
        answerRange
      }
    })

    return answersSum
  }
}
export default new handleAnswersSum().execute