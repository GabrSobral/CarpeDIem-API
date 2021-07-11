import handleGetRepositories from "../../utils/handleGetRepositories"

interface CreateCategoruService {
  name: string;
}

class CreateCategoryService{
  async execute({ name }: CreateCategoruService){
    const { categoryRepository } = handleGetRepositories()
    const categoryAlreadyExists = await categoryRepository.findOne({ name })

    if(categoryAlreadyExists){
      throw new Error("Category already exists status:400")
    }
    const category = categoryRepository.create({ name })
    await categoryRepository.save(category)

    return category
  }
}
export default new CreateCategoryService()