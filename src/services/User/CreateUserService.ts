import { hash } from 'bcryptjs'
import { User } from '../entities/User'
import handleGenerateToken from "./handleGenerateToken";
import handleGetRepositories from "../../utils/handleGetRepositories";

interface UserProps {
  name: string;
  email: string;
  password: string;
  role?: string | undefined;
};

interface IUser extends User {
  hasAnswered?: boolean;
}

class CreateUserService{
  async execute({name, email, password, role}: UserProps){
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
      password: encryptedPassword,
      role
    }) as IUser
    await userRepository.save(user)

    const token = handleGenerateToken(user)
    delete user.password

    user.hasAnswered: false

    return { user, token }
  }
};

export default new CreateUserService();