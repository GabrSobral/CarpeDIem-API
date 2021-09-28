import handleGetRepositories from "../../utils/handleGetRepositories";

interface CreateAnswerServiceProps {
  user: string;
  answers: [{
    question: string,
    answer: number,
  }];
}

class CreateAnswerService {
  async execute({ user, answers }: CreateAnswerServiceProps){
    const { answerRepository, questionRepository } = handleGetRepositories()

    const questions = await questionRepository.find()
    if(answers.length !== questions.length){
      throw new Error(`You have to answer all questions, ${questions.length - answers.length} remaining status:400`)
    }

    const alreadyAnswered = await answerRepository.find({ where: { user } })

    if(alreadyAnswered){
      await Promise.all(questions.map(async (item) => {
        answers.forEach(async (answer) => {
          if(String(item.id) === String(answer.question)) {
            await answerRepository.update(
              { user, question: item.id },
              { answer: String(answer.answer) }
            )
          }
        })
      }))

      return "All questions successfully updated"
    }

    await Promise.all(questions.map(async (item) => {
      answers.forEach(async (answer) => {
        if(String(item.id) === String(answer.question)) {
          const answerToSave = answerRepository.create({
            user: String(user),
            question:String(item.id), 
            category: String(item.category),
            answer: String(answer.answer),
          })
          console.log('answerToSave', answerToSave)
          await answerRepository.save(answerToSave)
        }
      })
    }))

    return "All questions successfully answered"
  }
}
export default new CreateAnswerService()