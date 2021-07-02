import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { hash } from 'bcryptjs'

interface User {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService{
  async execute({name, email, password}: User){
    const userRepository = getCustomRepository(UserRepository)
    
    const userAlreadyExists = await userRepository.findOne({email})

    if(userAlreadyExists){
      throw new Error("User Already exists")
    }
    const encryptedPassword = hash(password, 10, (error, hash) => {
      if(error){
        throw new Error(error.message)
      }
      console.log("encrypted password", hash)
    })

    const user = userRepository.create({
      name,
      email,
      password: String(encryptedPassword)
    })
    console.log(user)
    await userRepository.save(user)

    user.password = ""
    return user
  }
}