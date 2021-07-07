import { getCustomRepository } from "typeorm";
import { ActivityRepository } from "../../repositories/ActivityRepository.";
import { ArchiveActivityRepository } from "../../repositories/ArchiveActivityRepository";

interface CreateArchiveActiviryService {
  activity_id: string;
  archive_id: string;
}

class CreateArchiveActivityService {
  async execute({ activity_id, archive_id }: CreateArchiveActiviryService){
    if(!activity_id) { throw new Error("No activity provided status:400") }
    if(!archive_id) { throw new Error("No archive provided status:400") }
    
    const repository = getCustomRepository(ArchiveActivityRepository)
    const activityRepository = getCustomRepository(ActivityRepository)

    const activity = await activityRepository.findOne(activity_id)
    const category = activity.category

    const archiveActivity = repository.create({
      activity: activity_id,
      archive: archive_id,
      category
    })
    await repository.save(archiveActivity)

    return archiveActivity
  }
}
export default new CreateArchiveActivityService()