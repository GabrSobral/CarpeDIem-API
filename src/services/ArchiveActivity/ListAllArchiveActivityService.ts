import handleGetRepositories from "../../utils/handleGetRepositories";

class ListAllArchiveActivity {
  async execute(){
    const { archiveActivityRepository } = handleGetRepositories()

    const allArchiveActivities = await archiveActivityRepository.find()

    return allArchiveActivities
  }
}
export default new ListAllArchiveActivity()