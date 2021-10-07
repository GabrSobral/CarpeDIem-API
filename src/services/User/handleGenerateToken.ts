import { sign } from "jsonwebtoken"
import { User } from "../../entities/User"

class handleGenerateToken {
  execute(user_id: string){
    const token = sign(
      { id: user_id },
      process.env.TOKEN_SECRET,
      { expiresIn: 86400, subject: user_id }
    )
    
    return token
  }
}
export default new handleGenerateToken().execute