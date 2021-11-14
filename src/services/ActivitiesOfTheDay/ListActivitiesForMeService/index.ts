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

    const hasFeedback = goodFeedbacks.length !== 0 ? true : false;
    const answersSum = await handleAnswersSum(user_id, hasFeedback);

    for (let i = 0; i < userData.quantity_of_activities; i++) {
      const category = handleRandomCategory({answersSum});
      
      if( category === "FEEDBACK" ) {
        const feedbackFiltered = [];
        
        goodFeedbacks.forEach((feedback) => {
          const containGoodFeedbacks = orderedActivities.some((item) => item?.id === feedback.activity);
          !containGoodFeedbacks && feedbackFiltered.push(feedback);
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

      if(badFeedbacks.length !== 0) {
        activitiesOfCategory.forEach((activity, index) => {
          if(orderedActivities.some((item) => item?.id === activity?.id)) { return }
          
          if(RandomInteger(0, 10) < 7)
            badFeedbacks.some((item) => item.activity === activity?.id) &&
              activitiesOfCategory.splice(index, 1)
        });
      }

      const randomActivityOfCategory = RandomInteger(0, activitiesOfCategory.length - 1);

      orderedActivities.push(activitiesOfCategory[randomActivityOfCategory]);
    }
    await handleSaveInDB.users(userData)
    await handleSaveInDB.activities(orderedActivities, user_id)

    const orderedActivitiesWithFiles = await handlePutFilesInActivities(
      { activities: orderedActivities, user_id });
 
    return orderedActivitiesWithFiles;
  }
}
export default new ListActivitiesForMeTest();