import { hash } from 'bcryptjs'
import handleGenerateToken from "./handleGenerateToken";
import handleGetRepositories from "../../utils/handleGetRepositories";
import { User } from '../../entities/User';
import handleGenerateRefreshToken from '../../utils/handleGenerateRefreshToken';

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

    const userWithAllData = await userRepository.findOne(
      { email: lowercaseEmail }, 
      { select: [
        "id", 
        'email', 
        'name', 
        'created_at', 
        'updated_at',
        'quantity_of_activities',
        'activities_finished_today',
        'all_activities_finished'
      ] })

    const token = handleGenerateToken(user.id)
    const refreshToken = await handleGenerateRefreshToken(user.id)

    return { user: userWithAllData, token, refreshToken }
  }
};

export default new CreateUserService();