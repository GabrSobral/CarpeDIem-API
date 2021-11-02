import { Activity } from "../../../entities/Activity";

import handleGetRepositories from "../../../utils/handleGetRepositories";
import RandomInteger from "../../../utils/RandomInteger";
import handlePutFilesInActivities from "../../../utils/handlePutFilesInActivities";

import handleAnswersSum from './handleAnswersSum'
import handleRandomCategory from './handleRandomCategory'
import handleSaveInDB from "./handleSaveInDB";
import handleVerifyActivityValidity from "./handleVerifyActivityValidity";

class ListActivitiesForMeTest {
  async execute(user_id: string) {
    const { 
      feedbackRepository, 
      activitiesRepository, 
      userRepository } = handleGetRepositories();

    const userData = await userRepository.findOne({ id: user_id })

    if(!userData) {
      throw new Error('User not found status:400');}

    // await handleVerifyActivityValidity(userData)

    const orderedActivities = []
    
    const allFeedbacks = await feedbackRepository.find(
      { where: { user: user_id }, relations: ["JoinActivity", "JoinCategory"] })
      
    let goodFeedbacks = allFeedbacks.filter((item) => item.feedback);
    let badFeedbacks = allFeedbacks.filter((item) => !item.feedback);

    const answersSum = await handleAnswersSum(user_id, !!goodFeedbacks.length);

    for (let i = 0; i < userData.quantity_of_activities; i++) {
      const category = handleRandomCategory({answersSum});
      
      if(category === "FEEDBACK") {
        const feedbackFiltered = [];

        goodFeedbacks.forEach((feedback) => {
          const dontExists = orderedActivities.every((item) => item.id !== feedback.activity);
          dontExists && feedbackFiltered.push(feedback);
        });

        if (feedbackFiltered.length === 0){ i--;  continue; }

        const randomActivityOfCategory = RandomInteger(0, feedbackFiltered.length - 1);

        const activityObject = {
          ...feedbackFiltered[randomActivityOfCategory].JoinActivity,
          JoinCategory: feedbackFiltered[randomActivityOfCategory].JoinCategory,
        }
        orderedActivities.push(activityObject);
        continue;
      }

      const activitiesOfCategory = await activitiesRepository
        .find({ where: { category }, relations: ["JoinCategory"] });

      const ActivitiesFiltered: Activity[] = [];

      activitiesOfCategory.forEach((activity) => {
        const dontExists = orderedActivities.every((item) => item.id !== activity.id);
        let leavePass = true;

        if((RandomInteger(0, 10) < 7) && (badFeedbacks.length !== 0)){
          const containBadFeedbacks = 
            badFeedbacks.every((item) => item.activity === activity.id);

          containBadFeedbacks && (leavePass = false);
        };
        
        ( dontExists && leavePass) && ActivitiesFiltered.push(activity);
      });

      const randomActivityOfCategory = RandomInteger(0, ActivitiesFiltered.length - 1);

      orderedActivities.push(ActivitiesFiltered[randomActivityOfCategory]);
    }
    
    await handleSaveInDB.users(userData)
    await handleSaveInDB.activities(orderedActivities, user_id)

    const orderedActivitiesWithFiles = await handlePutFilesInActivities(
      { activities: orderedActivities, user_id });
 
    return orderedActivitiesWithFiles;
  }
}
export default new ListActivitiesForMeTest();