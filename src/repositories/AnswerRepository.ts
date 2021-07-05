import { EntityRepository, Repository } from "typeorm";
import { Answer } from "../entities/Answer";

@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {}