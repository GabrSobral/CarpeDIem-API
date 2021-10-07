import handleGetRepositories from "../../utils/handleGetRepositories";

interface CreateArchiveActiviryService {
  activity_id: string;
  archive_id: string;
}

class CreateArchiveActivityService {
  async execute({ activity_id, archive_id }: CreateArchiveActiviryService){
    if(!activity_id) 
      throw new Error("No activity provided status:400")

    if(!archive_id) 
      throw new Error("No archive provided status:400")

    const { activitiesRepository, archiveActivityRepository } = handleGetRepositories()

    const activity = await activitiesRepository.findOne({ where: { id: activity_id }})

    const category = activity.category

    const archiveActivity = archiveActivityRepository.create({
      archive: archive_id,
      activity: activity_id,
      category
    })

    await archiveActivityRepository.save(archiveActivity)

    return archiveActivity
  }
}
export default new CreateArchiveActivityService()