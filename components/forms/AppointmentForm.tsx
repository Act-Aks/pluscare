'use client'

import CustomFormField from '@/components/CustomFormField'
import { FORM_FIELD_TYPE } from '@/components/CustomFormField/CustomFormField.static'
import SubmitButton from '@/components/SubmitButton'
import { Form } from '@/components/ui/form'
import { Doctors } from '@/constants'
import { createUser } from '@/lib/actions/patient.actions'
import { TUserFormSchema, UserFormSchema } from '@/lib/schemaValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TypeOf } from 'zod'
import Each from '../Each'
import { SelectItem } from '../ui/select'

type AppointmentFormProps = {
  type: 'create' | 'cancel' | 'schedule'
  userId: string
  patientId: string
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ type, userId, patientId }) => {
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

  let buttonLabel

  switch (type) {
    case 'create':
      buttonLabel = 'Request Appointment'
      break
    case 'cancel':
      buttonLabel = 'Cancel Appointment'
      break
    case 'schedule':
      buttonLabel = 'Schedule Appointment'

    default:
      break
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
        <section className='mb-12 space-y-4'>
          <h1 className='header'>New Appointment</h1>
          <p className='text-dark-700'>Request a new appointment</p>
        </section>
        {type !== 'cancel' && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FORM_FIELD_TYPE.SELECT}
              name={'primaryPhysician'}
              label={'Doctor'}
              placeholder={'Select a doctor'}
            >
              <Each
                of={Doctors}
                render={doctor => (
                  <SelectItem value={doctor.name} id={doctor.name}>
                    <div className='flex cursor-pointer items-center gap-2'>
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        height={32}
                        width={32}
                        className='rounded-full border border-dark-500'
                      />
                      <p className='text-14-medium'>{doctor.name}</p>
                    </div>
                  </SelectItem>
                )}
              />
            </CustomFormField>

            <CustomFormField
              control={form.control}
              fieldType={FORM_FIELD_TYPE.DATE_PICKER}
              name={'date'}
              label={'Expected appointment date'}
              showTimeSelect
              dateFormat={'MM/dd/yyyy - h:mm aa'}
            />

            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                control={form.control}
                fieldType={FORM_FIELD_TYPE.TEXTAREA}
                name={'reason'}
                label={'Reason'}
                placeholder={'Enter your reason'}
              />

              <CustomFormField
                control={form.control}
                fieldType={FORM_FIELD_TYPE.TEXTAREA}
                name={'notes'}
                label={'Notes'}
                placeholder={'Enter your notes'}
              />
            </div>
          </>
        )}

        {type === 'cancel' && (
          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.TEXTAREA}
            name={'cancellationReason'}
            label={'Reason for cancellation'}
            placeholder={'Enter your reason for cancellation'}
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  )
}

export default AppointmentForm
