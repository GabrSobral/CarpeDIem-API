import { EntityRepository, Repository } from "typeorm";
import { ArchiveActivity } from "../entities/ArchiveActivity";

@EntityRepository(ArchiveActivity)
export class ArchiveActivityRepository extends Repository<ArchiveActivity> {}