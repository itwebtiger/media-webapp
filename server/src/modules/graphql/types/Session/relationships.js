import { GraphQLString, GraphQLList } from 'graphql'

import { Account } from '../Account'

import {
  findById as findAccountById,
  searchByEmail as searchAccountsByEmail
} from 'services/account'

export default () => ({
  account: {
    args: {
      id: {
        type: GraphQLString
      }
    },
    type: Account,
    resolve: async (session, { id }) => {
      if (!id) {
        const { account } = session

        // add ref
        account.session = session

        return account
      }

      return await findAccountById(id)
    }
  },
  accounts: {
    args: {
      email: {
        type: GraphQLString
      }
    },
    type: new GraphQLList(Account),
    resolve: async (session, { email }) => {
      const accounts = await searchAccountsByEmail(email)

      return accounts
    }
  }
})
