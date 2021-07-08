import { sign } from "jsonwebtoken"
import { User } from "../../entities/User"

class handleGenerateToken {
  execute(user: User){
    const token = sign(
      { id: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: 86400, subject: user.id }
    )
    
    return token
  }
}
export default new handleGenerateToken().execute