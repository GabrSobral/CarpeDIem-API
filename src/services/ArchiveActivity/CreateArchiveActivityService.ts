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

    const activity = await activityRepository
    .createQueryBuilder('activity')
    .where("activity.id = :id", { id: activity_id })
    .getOne()

    const category = activity.category

    const archiveActivity = repository.create({
      archive: archive_id,
      activity: activity_id,
      category
    })

    console.log(archiveActivity)

    await repository.save(archiveActivity)

    return archiveActivity
  }
}
export default new CreateArchiveActivityService()