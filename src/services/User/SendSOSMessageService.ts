import { vonage } from "../../config/vonage";

class SendSOSMessageService {
  async execute(to: string, username: string){
    const text = 
    `Alerta! (essa mensagem é automática) \n
    *${username}* está passando mal e o seu contato foi marcado por ele para que possa você possa oferecer uma possível ajuda.`
    const from = "14157386170"
    // const to = "5513991599324"

    try {
      console.log("private key: ",process.env.VONAGE_PRIVATE_KEY_PATH)
      vonage.channel.send(
        { type: "whatsapp", number: to },
        { type: "whatsapp", number: from },
        { content: { type: "text", text } },
  
        (err, data) => {
          if (err) {
            console.error(err);
            throw new Error("Error on send emergency message status:400")
          }
        }
      )
    } catch(error) {
      console.log(error)
    } finally { return }
  }
}
export default new SendSOSMessageService()