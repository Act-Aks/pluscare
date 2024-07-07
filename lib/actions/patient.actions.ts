'use server'

import { Users } from '@/configs/appwrite'
import { ID, Query } from 'node-appwrite'
import { parseStringify } from '../utils'

export const createUser = async (user: CreateUserParams) => {
  try {
    console.log(Users)
    const createdUser = await Users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    )

    console.log(createdUser)

    return parseStringify(createdUser)
  } catch (error: any) {
    if (error && error?.code === 409) {
      const usersDocument = await Users.list([Query.equal('email', user.email)])

      return usersDocument?.users[0]
    }

    throw error
  }
}
