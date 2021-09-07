import { Request, Response } from "express";
import SendSMSService from "../../services/User/SendSOSMessageService";

class SendSOSMessageController {
  async handle(request: Request, response: Response) {
    const { to } = request.body

    await SendSMSService.execute(to)

    return response.sendStatus(200)
  }
}
export default new SendSOSMessageController()