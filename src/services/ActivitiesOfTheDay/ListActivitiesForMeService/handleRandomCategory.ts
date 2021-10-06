interface handleRandomCategoryProps {
  answersSum: {
    category: string;
    answerRange: number[]
  }[]
}

class handleRandomCategory {
  execute({ answersSum }: handleRandomCategoryProps) {
    const randomCategoryRange = Math.round(
      Math.random() * answersSum[answersSum.length -1].answerRange[1])

    const [{ category }] = answersSum.filter(item => {
      if((item.answerRange[0] <= randomCategoryRange) && (item.answerRange[1] >= randomCategoryRange)) {
        return item.category
      }
    })

    return category
  }
}
export default new handleRandomCategory().execute;
