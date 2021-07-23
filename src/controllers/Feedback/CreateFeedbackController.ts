import { Request, Response } from 'express';
import CreateFeedbackService from '../../services/Feedback/CreateFeedbackService';

class CreateFeedbackController {
  async handle(request: Request, response: Response) {
    const { activity, feedback } = request.body;
    const user_id = request.user_id;

    const newFeedback = await CreateFeedbackService.execute({
      user_id,
      activity_id: activity,
      feedback
    });

    return response.json(newFeedback);
  }
}
export default new CreateFeedbackController();
