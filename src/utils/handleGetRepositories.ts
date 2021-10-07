import { getCustomRepository } from 'typeorm';
import { ActivitiesOfTheDayRepository } from '../repositories/ActivitiesOfTheDayRepository';
import { ActivityRepository } from '../repositories/ActivityRepository.';
import { AnswerRepository } from '../repositories/AnswerRepository';
import { ArchiveActivityRepository } from '../repositories/ArchiveActivityRepository';
import { ArchiveRepository } from '../repositories/ArchiveRepository';
import { CategoryRepository } from '../repositories/CategoryRepository';
import { FeedbackRepository } from '../repositories/FeedbackRepository';
import { QuestionRepository } from '../repositories/QuestionRepository';
import { UserRepository } from '../repositories/UserRepository';
import { RefreshTokenRepository } from '../repositories/RefreshTokenRepository';

class handleGetRepositories {
  execute() {
    const userRepository = getCustomRepository(UserRepository);
    const answerRepository = getCustomRepository(AnswerRepository);
    const archiveRepository = getCustomRepository(ArchiveRepository);
    const feedbackRepository = getCustomRepository(FeedbackRepository);
    const questionRepository = getCustomRepository(QuestionRepository);
    const categoryRepository = getCustomRepository(CategoryRepository);
    const activitiesRepository = getCustomRepository(ActivityRepository);
    const refreshTokenRepository = getCustomRepository(RefreshTokenRepository);
    const archiveActivityRepository = getCustomRepository(
      ArchiveActivityRepository
    );
    const activitiesOfTheDayRepository = getCustomRepository(
      ActivitiesOfTheDayRepository
    );

    const repositories = {
      userRepository,
      answerRepository,
      archiveRepository,
      feedbackRepository,
      questionRepository,
      categoryRepository,
      activitiesRepository,
      refreshTokenRepository,
      archiveActivityRepository,
      activitiesOfTheDayRepository
    };
    return repositories;
  }
}
export default new handleGetRepositories().execute;
