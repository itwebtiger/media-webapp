import escapeStringRegexp from 'escape-string-regexp'
import uuid from 'uuid'

import Account from 'models/Account'

export const list = async () => {
  return await Account.find().lean().exec()
}

export const create = async (info) => {
  // TODO generate randomize password
  // TODO send password via email
  const password = uuid.v4()
  const { email } = info

  return await new Account({
    email,
    password
  }).save()
}

export const findById = async (id) => {
  return await Account.findById(id)
}

export const findByEmail = async (email) => {
  if (!email) {
    throw new Error('Invaid parameter')
  }

  return await Account.findOne({ email })
}

export const searchByEmail = async (email) => {
  if (!email) {
    throw new Error('Invaid parameter')
  }
  const escapeString = escapeStringRegexp(email)

  //regex to describes a pattern of character: matches beginning of email
  const emailRegex = new RegExp(`^${ escapeString }`)

  return await Account.find({ email: emailRegex })
}

export const changePassword = async (_id, currentPassword, newPassword) => {
  const account = await Account.findOne({ _id })

  if (!account.comparePassword(currentPassword)) {
    throw new Error('Incorrect Password')
  }

  account.password = newPassword
  await account.save()

  return true
}
