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

    const feedBackUser = [
      {
        user,
        feedback: true,
        activity: {
          id: 'fec802e5-7c7f-47da-ada3-16c4bad122c4',
          title: 'O poder do som',
          description: 'Músicoterapia na sua vida, desde a antiguidade.',
          body: '<p>Desde a antiguidade, a música tem sido usada para melhorar nossa saúde mental e física. O filósofo e matemático grego, Pitágoras, acreditaca firmemente no poder curativo da música, enquanto o médico e enciclopedista romano, Celsius, afirmava que ela deveria ser usada para animar e acalmar pacientes. Ambos estavam certos e a ciência moderna nos comprova isso.</p><p>Escolha uma música relaxante para escutar, e aproveite seu momento de paz, lembre-se sempre de que a musicoterapia não é o suficiente para a cura em casos graves, e sempre deve vir com o acompanhamento de medicamentos especializados e apoio profissional.</p>',
          category: '2d6b89c3-40d6-4992-99e7-e91ac3fc9783',
          created_at: '2021-07-13T16:10:45.006Z',
          updated_at: '2021-07-20T22:32:51.707Z'
        }
      },
      {
        user,
        feedback: false,
        activity: {
          id: '04f5a9f9-2c8f-447f-a3d7-97ade3a60ed6',
          title: 'Atividade de musica 1',
          description: 'Teste',
          body: 'Teste de categoria',
          category: '2d6b89c3-40d6-4992-99e7-e91ac3fc9783',
          created_at: '2021-07-22T00:52:38.656Z',
          updated_at: '2021-07-22T00:52:38.656Z'
        }
      },
      {
        user,
        feedback: false,
        activity: {
          id: 'aa0247a9-3884-4f6c-b7b3-fab26bcd5a2e',
          title: 'Lorem Ipsum',
          description:
            'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
          body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nisi magna, auctor eu pellentesque vitae, malesuada suscipit libero. Sed tempus sodales felis, eget lacinia libero euismod in. Pellentesque a porta nunc, eget consectetur nisi. Vivamus convallis, tellus ut aliquam maximus, lacus mi condimentum ligula, vitae gravida arcu justo iaculis nisi. <hr>Ut eget imperdiet augue. Curabitur quis convallis quam. Donec efficitur augue iaculis magna egestas semper. Nunc purus lorem, ornare non luctus sed, suscipit eget felis. Vivamus iaculis nulla tortor, nec tempus nibh tempus eget. <hr>Nulla in ex ornare, viverra massa ut, convallis erat. Integer faucibus ante risus, non cursus ante tincidunt quis. In commodo ligula eget libero tincidunt, eu tincidunt tellus interdum. ',
          category: '2d6b89c3-40d6-4992-99e7-e91ac3fc9783',
          created_at: '2021-07-17T19:05:20.505Z',
          updated_at: '2021-07-21T00:10:30.263Z'
        }
      }
    ];

    let goodFeedback = feedBackUser.filter((item) => item.feedback);
    let badFeedback = feedBackUser.filter((item) => !item.feedback);

    const { userRepository, answerRepository, activitiesRepository } =
      handleGetRepositories();

    // await handleVerifyActivityValidity(user)

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

    const average = answersSum[answersSum.length - 1] / userAnswers.length;

    if (goodFeedback.length !== 0) {
      answersSum.push(answersSum[answersSum.length - 1] + average); // user feedback chance
    }

    for (let index = 0; index < quantityOfActivitiesInList; index++) {
      filteredActivities = [];
      const currentCategory = handleRandomCategory(answersSum, userAnswers);

      if (currentCategory === 'feedback') {
        let random = Math.floor(
          Math.random() * (goodFeedback.length - 1 - 0 + 1) + 0
        );
        const activity = allActivities.filter(
          (item) => item.id === goodFeedback[random].activity.id
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
            (item) => item.activity.id !== activity.id
          );
          if (alreadyExists) {
            Activities.push(activity);
          }
        });
        console.log('badFeedback feito');
        console.log('-------------------------------------');
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

    const orderedActivitiesWithFiles = await handlePutFilesInActivities(
      orderedActivities
    );

    await handleSaveInDB.activities(orderedActivities, user);
    await handleSaveInDB.users(userData);

    return orderedActivitiesWithFiles;
  }
}
export default new ListActivitiesForMeService();
