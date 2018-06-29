import {
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import {
  create as createAccount
} from 'services/account'
import {
  requestRessetPassword as requestResset,
  ressetPassword as ressetPassword
} from 'services/resetPasswordCode'

import { Account, AccountStruct } from '../types/Account'
export default () => ({
  _createAccount: {
    args: {
      account: {
        type: new GraphQLNonNull(AccountStruct)
      }
    },
    type: Account,
    resolve: async (rootValue, { account }) => {
      return await createAccount(account)
    }
  },
  _requestRessetPassword: {
    args: {
      email: {
        type: GraphQLNonNull(GraphQLString)
      }
    },
    type: GraphQLBoolean,
    resolve: async (rootValue, email) => {
      return await requestResset(email)
    }
  },
  _ressetPassword: {
    args: {
      password: {
        type: GraphQLNonNull(GraphQLString)
      },
      code: {
        type: GraphQLNonNull(GraphQLString)
      },

    },
    type: GraphQLBoolean,
    resolve: async (rootValue, { password, code }) => {
      return await ressetPassword(password, code)
    }
  }
})