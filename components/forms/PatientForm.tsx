'use client'

import CustomFormField from '@/components/CustomFormField'
import { FORM_FIELD_TYPE } from '@/components/CustomFormField/CustomFormField.static'
import SubmitButton from '@/components/SubmitButton'
import { Form } from '@/components/ui/form'
import { createUser } from '@/lib/actions/patient.actions'
import { TUserFormSchema, UserFormSchema } from '@/lib/schemaValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TypeOf } from 'zod'

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<TypeOf<TUserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  })

  const onSubmit = async (values: TypeOf<TUserFormSchema>) => {
    try {
      setIsLoading(true)
      const user = await createUser(values)

      if (user) router.push(`/patient/${user.$id}/register`)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>Schedule an appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FORM_FIELD_TYPE.INPUT}
          name={'name'}
          label={'Full name'}
          placeholder={'Aks'}
          icon={'/assets/icons/user.svg'}
        />
        <CustomFormField
          control={form.control}
          fieldType={FORM_FIELD_TYPE.INPUT}
          name={'email'}
          label={'Email'}
          placeholder={'aks@gmail.com'}
          icon={'/assets/icons/email.svg'}
        />
        <CustomFormField
          control={form.control}
          fieldType={FORM_FIELD_TYPE.PHONE_INPUT}
          name={'phone'}
          label={'Phone number'}
          placeholder={'(+91) 1234567890'}
        />

        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm
