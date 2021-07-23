import { Answer } from '../../../entities/Answer';

class handleRandomCategory {
  execute(answersSum: number[], userAnswers: Answer[]) {
    const random = Math.round(
      Math.random() * answersSum[answersSum.length - 1]
    );
    let currentCategory = '';

    for (let i = 0; i < answersSum.length; i++) {
      if (i === 0) {
        if (random <= answersSum[i]) {
          currentCategory = userAnswers[i].category;
          break;
        }
      }

      if (random > answersSum[i] && random <= answersSum[i + 1]) {
        currentCategory = userAnswers[i + 1].category;
        break;
      }

      if (random <= answersSum[i]) {
        currentCategory = userAnswers[i].category;
        break;
      }
      if (random <= answersSum[answersSum.length - 1]) {
        console.log('feedback');
        currentCategory = 'feedback';
        break;
      }
    }
    return currentCategory;
  }
}
export default new handleRandomCategory().execute;
