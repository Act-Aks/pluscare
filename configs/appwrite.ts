import * as NodeAppwriteSDK from 'node-appwrite'
import { z } from 'zod'

const EnvSchema = z.object({
  PROJECT_ID: z.string().default(''),
  PROJECT_API_KEY: z.string().default(''),
  PROJECT_DATABASE_ID: z.string().default(''),
  PROJECT_PATIENT_COLLECTION_ID: z.string().default(''),
  PROJECT_DOCTOR_COLLECTION_ID: z.string().default(''),
  PROJECT_APPOINTMENT_COLLECTION_ID: z.string().default(''),
  NEXT_PUBLIC_STORAGE_BUCKET_ID: z.string().default(''),
  NEXT_PUBLIC_ENDPOINT: z.string().default(''),
})

const Env = EnvSchema.parse(process.env)

const client = new NodeAppwriteSDK.Client()

client.setEndpoint(Env.NEXT_PUBLIC_ENDPOINT).setProject(Env.PROJECT_ID).setKey(Env.PROJECT_API_KEY)

export const Databases = new NodeAppwriteSDK.Databases(client)
export const Storage = new NodeAppwriteSDK.Storage(client)
export const Users = new NodeAppwriteSDK.Users(client)
export const Messaging = new NodeAppwriteSDK.Messaging(client)
