import { getCustomRepository } from "typeorm";
import { CategoryRepository } from "../../repositories/CategoryRepository";

class ListAllCategories {
  async execute(){
    const repository = getCustomRepository(CategoryRepository)

    const allCategories = await repository.find()

    return allCategories
  }
}
export default new ListAllCategories()