import { EntityRepository, Repository } from "typeorm";
import { ActivitiesOfTheDay } from "../entities/ActivitiesOfTheDay";

@EntityRepository(ActivitiesOfTheDay)
export class ActivitiesOfTheDayRepository extends Repository<ActivitiesOfTheDay> {}