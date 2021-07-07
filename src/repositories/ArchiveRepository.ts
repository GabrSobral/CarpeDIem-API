import { EntityRepository, Repository } from "typeorm";
import { Archive } from "../entities/Archive";

@EntityRepository(Archive)
export class ArchiveRepository extends Repository<Archive> {}