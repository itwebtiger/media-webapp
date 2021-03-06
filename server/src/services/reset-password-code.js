import shorthash from 'shorthash'
import uuid from 'uuid'

import Account from 'models/Account'
import ResetPasswordCode from 'models/Reset-password-code'

export const forgotPassword = async (email) => {

  const account = await Account.findOne({ email }).lean()

  if (!account) {
    return null
  }

  const now = new Date()
  const { _id, removed } = account

  if (!_id && removed) {
    return null
  }

  const code = shorthash.unique(uuid.v4())
  const accountExists = await ResetPasswordCode.findOne({ uid: _id }).lean()

  if (accountExists) {
    const { used, uid } = accountExists

    if (!used && String(_id) === String(uid)) {
      return accountExists
    }
  }

  let dateExpired = now.getDate()+1
  let newExpired = new Date(now.setDate(dateExpired))

  return await new ResetPasswordCode({
    code,
    uid: _id,
    expired: newExpired
  }).save()
}

export const resetPassword = async (password, code) => {
  const accountExists = await ResetPasswordCode.findOne({ code }).lean()

  if (!accountExists) {
    return false
  }

  const { used, uid: _id } = accountExists

  if (!_id || used) {
    return false
  }

  const account = await Account.findOne({ _id })
  account.password = password
  await account.save()
  const { ok } = await ResetPasswordCode.deleteOne({ code })
  return ok === 1
}

export const getResetCode = async (code) => {
  const { uid } = await ResetPasswordCode.findOne({ code }).lean()
  const account = await Account.findOne({ _id: uid }).lean()
  return account
}
