import { EntityRepository, Repository } from 'typeorm';
import { Feedback } from '../entities/Feedback';

@EntityRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback> {}
