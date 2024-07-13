import * as NodeAppwriteSDK from 'node-appwrite'
import { Env } from './env'

const client = new NodeAppwriteSDK.Client()

client.setEndpoint(Env.NEXT_PUBLIC_ENDPOINT).setProject(Env.PROJECT_ID).setKey(Env.PROJECT_API_KEY)

export const Databases = new NodeAppwriteSDK.Databases(client)
export const Storage = new NodeAppwriteSDK.Storage(client)
export const Users = new NodeAppwriteSDK.Users(client)
export const Messaging = new NodeAppwriteSDK.Messaging(client)
