import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

class ListUserService{ 
  async execute(){
    const repository = getCustomRepository(UserRepository)
    const users = await repository.find()

    return users
  }
}

export default new ListUserService()