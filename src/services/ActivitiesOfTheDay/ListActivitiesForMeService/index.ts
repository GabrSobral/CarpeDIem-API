import { Activity } from '../../../entities/Activity';

import handleGetRepositories from '../../../utils/handleGetRepositories';
import handlePutFilesInActivities from '../../../utils/handlePutFilesInActivities';
import handleRandomCategory from './handleRandomCategory';
import handleSaveInDB from './handleSaveInDB';
import handleVerifyActivityValidity from './handleVerifyActivityValidity';

class ListActivitiesForMeService {
  async execute(user: string) {
    let filteredActivities = [] as Activity[];
    const orderedActivities = [] as Activity[];
    const includedActivityIndex = [] as number[];
    const answersSum = [];
    let currentAnswerSum = 0;
    let previousAnswerSum = 0;

    const {
      userRepository,
      answerRepository,
      feedbackRepository,
      activitiesRepository
    } = handleGetRepositories();

    await handleVerifyActivityValidity(user);

    const userData = await userRepository.findOne(user);

    if (!userData) {
      throw new Error('User not found status:400');
    }
    const quantityOfActivitiesInList = userData.quantity_of_activities;

    const userAnswers = await answerRepository
      .createQueryBuilder('answer')
      .where('answer.user = :user', { user })
      .getMany();

    if (userAnswers.length === 0) {
      throw new Error('User dont have answers yet status:400');
    }

    let allActivities = await activitiesRepository.find({
      relations: ['JoinCategory']
    });

    userAnswers.forEach((item) => {
      currentAnswerSum = Number(item.answer);
      answersSum.push(previousAnswerSum + currentAnswerSum);
      previousAnswerSum = currentAnswerSum;
    });

    const feedBackUser = await feedbackRepository.find({
      where: { user },
      relations: ['JoinActivity']
    });
    let goodFeedback = feedBackUser.filter((item) => item.feedback);
    let badFeedback = feedBackUser.filter((item) => !item.feedback);
    const hasFeedback = goodFeedback.length !== 0 ? true : false

    console.log('good:', goodFeedback)
    console.log('bad:', badFeedback)

    if (hasFeedback) {
      const average = answersSum[answersSum.length - 1] / userAnswers.length;
      answersSum.push(answersSum[answersSum.length - 1] + average); // user feedback chance
    }

    try{
   
      for (let index = 0; index < quantityOfActivitiesInList; index++) {
        filteredActivities = [];
        const currentCategory = handleRandomCategory(answersSum, userAnswers, hasFeedback);

        if (currentCategory === 'feedback') {
          let random = Math.floor(
            Math.random() * (goodFeedback.length - 1 - 0 + 1) + 0
          );
          const activity = allActivities.filter(
            (item) => item.id === goodFeedback[random]?.JoinActivity.id
          );
          if (orderedActivities.indexOf(activity[0]) !== -1) {
            index = index - 1;
            continue;
          }
          orderedActivities.push(activity[0]);
          continue;
        }
        const badFeedbackRandom = Math.round(Math.random() * 10);

        if (badFeedbackRandom <= 8) {
          const Activities: Activity[] = [];

          allActivities.forEach((activity) => {
            const alreadyExists = badFeedback.every(
              (item) => item?.JoinActivity.id !== activity.id
            );

            if (alreadyExists) {
              Activities.push(activity);
            }
          });
          allActivities = Activities;
        }

        allActivities.forEach((item) => {
          if (filteredActivities.indexOf(item) !== -1) {
            return;
          }

          if (currentCategory === item.category) {
            filteredActivities.push(item);
          }
        });

        const max = filteredActivities.length - 1;
        const min = 0;
        let random = Math.floor(Math.random() * (max - min + 1) + min);

        const checkIfArrayIsTheSame = (array: Array<any>, target: Array<any>) =>
          target.every((v) => array.includes(v));

        if (checkIfArrayIsTheSame(orderedActivities, filteredActivities)) {
          index = index - 1;
        } else {
          while (orderedActivities.indexOf(filteredActivities[random]) !== -1) {
            random = Math.floor(Math.random() * (max - min + 1) + min);
          }
          includedActivityIndex.push(random);
          orderedActivities.push(filteredActivities[random]);
        }
      }

      const orderedActivitiesWithFiles = await handlePutFilesInActivities(orderedActivities, user);

      await handleSaveInDB.activities(orderedActivities, user);
      await handleSaveInDB.users(userData);

      return orderedActivitiesWithFiles;

    } catch (error) {
      console.log(error)
    }
  }
}
export default new ListActivitiesForMeService();
