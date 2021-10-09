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
    const userAnswers = await answerRepository.find({ where: { user } })
    console.log(userAnswers)

    await Promise.all(answers.map(async (item) => {
      const alreadyExists = userAnswers.every(
        answer => (item.question === answer.question))

          console.log(alreadyExists)
      
      if (alreadyExists && userAnswers.length !== 0)
        await answerRepository.update(
          { user, question: item.question },
          { answer: String(item.answer) })
      else {
        const [{ category }] = questions.filter(question => question.id === item.question)

        const answerToSave = answerRepository.create({
          user: String(user),
          question:String(item.question), 
          category: String(category),
          answer: String(item.answer)
        })
        await answerRepository.save(answerToSave)
      }
      return
    }))
    
    return "All questions successfully answered"
  }
}
export default new CreateAnswerService()