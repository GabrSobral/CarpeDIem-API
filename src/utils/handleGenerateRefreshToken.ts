import handleGetRepositories from "./handleGetRepositories"


class handleGenerateRefreshToken {
  async execute(user_id: string){
    const { refreshTokenRepository } = handleGetRepositories()

    const currentDate = new Date()
    const expires_in = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 10,
      currentDate.getHours(),
      currentDate.getMinutes(),
      currentDate.getSeconds()
    )

    const refreshToken = refreshTokenRepository.create({
      user_id,
      expires_in: expires_in.getTime() / 1000
    })
    await refreshTokenRepository.save(refreshToken)

    return { refreshToken }
  }
}
export default new handleGenerateRefreshToken().execute