import handleGetRepositories from "../../utils/handleGetRepositories"

class DeleteactivityService{
  async execute(id: string){
    const { activitiesRepository } = handleGetRepositories()

    const activityExists = await activitiesRepository
    .createQueryBuilder()
    .where("id = :activity", { activity: id })
    .getOne()

    if(!activityExists){
      throw new Error("No activity found status:400")}

    await activitiesRepository.delete(activityExists)

    return
  }
}
export default new DeleteactivityService()