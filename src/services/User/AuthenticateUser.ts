import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { getCustomRepository } from "typeorm"
import { UserRepository } from "../../repositories/UserRepository"

interface IAuthenticateUser {
  email: string;
  password: string
}

class AuthenticateUser {
  async execute({ email, password }: IAuthenticateUser){
    const repository = getCustomRepository(UserRepository)

    email = email.toLowerCase()

    const user = await repository.findOne(
      { email }, 
      { select: ["id", "password", 'email', 'name', 'created_at', 'updated_at'] })

    if(!user){
      throw new Error("Email/password invalid status:400")
    }
    if(!await compare(password, user.password)){
      throw new Error('Email/password invalid status:400')
    }
    
    const token = sign(
      { id: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h', subject: user.id }
    )
    delete user.password

    return { user, token }
  }
}

export default new AuthenticateUser()