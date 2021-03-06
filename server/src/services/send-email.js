import config from 'infrastructure/config'
import ses from 'infrastructure/mailer/ses'

import { register, inviteToRegister, resetPassword } from 'services/email-template'

const sendEmail = async (emailContent, email) => {
  const sender = config.aws.ses.sender
  const destination = { ToAddresses: [ `${ email }` ] }
  const params = { ...emailContent, Destination: destination, Source: sender }

  if (!config.production) {
    console.log(params)

    return
  }

  return await ses.sendEmail(params).promise()

}

export const sendEmailRegister = async (email, code) => {

  const emailContent = register({ email, code })

  const result = await sendEmail(emailContent, email)

  return !!result.MessageId
}

export const sendEmailInviteToRegister = async (email, code, messenge) => {

  const emailContent = inviteToRegister({ email, code, messenge })

  const result = await sendEmail(emailContent, email)

  return !!result.MessageId
}

export const sendEmailResetPassword = async (email, code) => {

  const emailContent = resetPassword({ email, code })

  const result = await sendEmail(emailContent, email)

  return !!result.MessageId
}
