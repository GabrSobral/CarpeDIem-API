import handleGetRepositories from "../../utils/handleGetRepositories";

class ListAllCategoriesService {
  async execute(){
    const { categoryRepository } = handleGetRepositories()

    const allCategories = await categoryRepository.find()

    return allCategories
  }
}
export default new ListAllCategoriesService()