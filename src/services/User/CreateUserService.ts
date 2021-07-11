import { hash } from 'bcryptjs'
import handleGenerateToken from "./handleGenerateToken";
import handleGetRepositories from "../../utils/handleGetRepositories";

interface User {
  name: string;
  email: string;
  password: string;
};

class CreateUserService{
  async execute({name, email, password}: User){
    const { userRepository } = handleGetRepositories()
    const userAlreadyExists = await userRepository.findOne({email})

    if(userAlreadyExists){
      throw new Error("User Already exists status:400")
    }
    const encryptedPassword = await hash(password, 10)

    const lowercaseEmail = email.toLowerCase()

    const user = userRepository.create({
      name,
      email: lowercaseEmail,
      password: encryptedPassword
    })
    await userRepository.save(user)

    const token = handleGenerateToken(user)
    delete user.password

    return { user, token }
  }
};

export default new CreateUserService();