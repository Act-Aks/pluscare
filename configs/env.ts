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

export const Env = EnvSchema.parse(process.env)
