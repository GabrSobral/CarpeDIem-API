import nodemailer from 'nodemailer'
import path from 'path'
import hbs from 'nodemailer-express-handlebars'
import { google } from 'googleapis'

const OAuth2 = google.auth.OAuth2

class SendEmail {
  async execute(email: string, token: string) {
    const host = process.env.HOST_SENDMAIL
    const user = process.env.USER_SENDMAIL
    const port = process.env.PORT_SENDMAIL
    
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET
    const REDIRECT_URL = process.env.REDIRECT_URL
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN

    const myOAuth2Client = new OAuth2(
      CLIENT_ID, 
      CLIENT_SECRET,
      REDIRECT_URL
    )

    myOAuth2Client.setCredentials({
      refresh_token: REFRESH_TOKEN
    })

    const myAccessToken = await myOAuth2Client.getAccessToken()

    try{
      const transport = nodemailer.createTransport({
        host,
        port,
        auth: { 
          type : "OAuth2",
          service: "gmail",
          secure: "true",
          user,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: myAccessToken
        },
        tls: {
          rejectUnauthorized: false
      }
      });

      transport.use('compile', hbs({
        viewEngine: {
            defaultLayout: undefined,
            partialsDir: path.resolve('./src/resources/mail/')
          },
          viewPath: path.resolve('./src/resources/mail/'),
          extName: '.html',
      }))
 
      transport.sendMail({
        to: email,
        subject: "Troca de senha",
        from: "Carpe Diem <Asgoth55@gmail.com>",
        template: 'forgotPassword',
        context: { token, email },
      }, (err)=> {
        if(err){
          throw new Error(err)
        }
      })

    }catch(err){
      throw new Error(err)
    }
  }
}

export default new SendEmail().execute