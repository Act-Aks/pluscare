'use server'

import { Databases, Storage, Users } from '@/configs/appwrite'
import { Env } from '@/configs/env'
import { ID, Query } from 'node-appwrite'
import { InputFile } from 'node-appwrite/file'
import { parseStringify } from '../utils'

export const createUser = async (user: CreateUserParams) => {
  try {
    const createdUser = await Users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name,
    )

    return parseStringify(createdUser)
  } catch (error: any) {
    if (error && error?.code === 409) {
      const usersDocument = await Users.list([Query.equal('email', user.email)])

      return usersDocument?.users[0]
    }
  }
}

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument.get('blobFile') as Blob,
        identificationDocument.get('fileName') as string,
      )

      file = await Storage.createFile(Env.NEXT_PUBLIC_STORAGE_BUCKET_ID, ID.unique(), inputFile)
    }

    const registeredPatient = await Databases.createDocument(
      Env.PROJECT_DATABASE_ID,
      Env.PROJECT_PATIENT_COLLECTION_ID,
      ID.unique(),
      {
        identificationDocumentId: file ? file.$id : null,
        identificationDocumentUrl: `${Env.NEXT_PUBLIC_ENDPOINT}/storage/buckets/${Env.NEXT_PUBLIC_STORAGE_BUCKET_ID}/files/${file?.$id}/view?project=${Env.PROJECT_ID}`,
        ...patient,
      },
    )

    return parseStringify(registeredPatient)
  } catch (error: any) {
    console.log(error)
  }
}

export const getUser = async (userId: string) => {
  try {
    const user = await Users.get(userId)

    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }
}

export const getPatient = async (userId: string) => {
  try {
    const patients = await Databases.listDocuments(
      Env.PROJECT_DATABASE_ID,
      Env.PROJECT_PATIENT_COLLECTION_ID,
      [Query.equal('userId', userId)],
    )

    return parseStringify(patients.documents[0])
  } catch (error) {
    console.log(error)
  }
}
