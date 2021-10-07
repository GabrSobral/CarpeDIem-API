import handleGenerateRefreshToken from "../../utils/handleGenerateRefreshToken"
import handleGetRepositories from "../../utils/handleGetRepositories"
import handleGenerateToken from "../User/handleGenerateToken"

class HandleUpdateToken {
  async execute(refresh_token: string){
    const { refreshTokenRepository } = handleGetRepositories()

    const refreshToken = await refreshTokenRepository.findOne({ where: { id: refresh_token } })

    if(!refreshToken)
      throw new Error("Refresh Token Invalid status:400")

    const token = handleGenerateToken(refreshToken.user_id)

    const UnixCurrentTime = new Date().getTime() / 1000

    if(UnixCurrentTime > refreshToken.expires_in){
      await refreshTokenRepository.delete({ user_id: refreshToken.user_id })
      const newRefreshToken = await handleGenerateRefreshToken(refreshToken.user_id)

      return { token, refreshToken: newRefreshToken }
    }


    return { token }
  }
}
export default new HandleUpdateToken()