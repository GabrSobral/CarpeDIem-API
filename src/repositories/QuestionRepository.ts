import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Question } from "../entities/Question";

@EntityRepository(Question)
export class QuestionRepository extends Repository<Question> {}