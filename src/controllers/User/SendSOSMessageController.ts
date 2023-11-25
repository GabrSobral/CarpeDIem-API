import { Request, Response } from "express";
// import SendSMSService from "../../services/User/SendSOSMessageService";

class SendSOSMessageController {
  async handle(request: Request, response: Response) {
    const { to, username } = request.body

    // await SendSMSService.execute(to, username)

    return response.sendStatus(200)
  }
}
export default new SendSOSMessageController()