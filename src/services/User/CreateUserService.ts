import { hash } from 'bcryptjs'
import handleGenerateToken from "./handleGenerateToken";
import handleGetRepositories from "../../utils/handleGetRepositories";
import { User } from '../../entities/User';
import handleGenerateRefreshToken from '../../utils/handleGenerateRefreshToken';
import handleUploadFile from '../Archive/handleUploadFile';

interface UserProps {
  name: string;
  email: string;
  password: string;
  role?: string | undefined;
  photo_url: Express.Multer.File;
};

interface UserObject {
  name: string;
  email: string;
  password: string;
  role: string;
  photo_url?: string;
  photo_public_id?: string;
}

class CreateUserService{
  async execute({name, email, password, role, photo_url}: UserProps){
    const { userRepository } = handleGetRepositories()

    const userAlreadyExists = await userRepository.findOne({email})

    if(userAlreadyExists){
      throw new Error("User Already exists status:400")
    }
    const encryptedPassword = await hash(password, 10)

    const lowercaseEmail = email.toLowerCase()
    
    const user: UserObject = {
      name,
      email: lowercaseEmail,
      password: encryptedPassword,
      role
    };

    if(photo_url) {
      const file_data = await handleUploadFile(photo_url);
      user.photo_url = photo_url.path;
      user.photo_public_id = file_data.public_id
    }

    const createdUser = userRepository.create(user)

    await userRepository.save(createdUser)

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
        'all_activities_finished',
        'emergency_number',
        'photo_url'
      ] })

    const token = handleGenerateToken(createdUser.id)
    const refreshToken = await handleGenerateRefreshToken(createdUser.id)

    return { user: userWithAllData, token, refreshToken }
  }
};

export default new CreateUserService();