import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { hash } from 'bcryptjs'

interface User {
  name: string;
  email: string;
  password: string;
};

class CreateUserService{
  async execute({name, email, password}: User){
    const repository = getCustomRepository(UserRepository)
    const userAlreadyExists = await repository.findOne({email})

    if(userAlreadyExists){
      throw new Error("User Already exists status:400")
    }
    const encryptedPassword = await hash(password, 10)

    const lowercaseEmail = email.toLowerCase()

    const user = repository.create({
      name,
      email: lowercaseEmail,
      password: encryptedPassword
    })
    await repository.save(user)

    delete user.password

    return user
  }
};

export default new CreateUserService();