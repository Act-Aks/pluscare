'use client'

import CustomFormField from '@/components/CustomFormField'
import { FORM_FIELD_TYPE } from '@/components/CustomFormField/CustomFormField.static'
import Each from '@/components/Each'
import SubmitButton from '@/components/SubmitButton'
import { Form, FormControl } from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Doctors, GenderOptions } from '@/constants'
import { createUser } from '@/lib/actions/patient.actions'
import { PatientFormSchema, TPatientFormSchema } from '@/lib/schemaValidations'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { TypeOf } from 'zod'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { SelectItem } from '../ui/select'

type RegisterFormProps = {
  user: User
}

const RegisterForm: React.FC<RegisterFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<TypeOf<TPatientFormSchema>>({
    resolver: zodResolver(PatientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      occupation: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      primaryPhysician: '',
      insuranceProvider: '',
      insurancePolicyNumber: '',
      allergies: '',
      currentMedication: '',
      familyMedicalHistory: '',
      pastMedicalHistory: '',
      identificationType: '',
      identificationNumber: '',
    },
  })

  const onSubmit = async (values: TypeOf<TPatientFormSchema>) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-12 flex-1'>
        <section className='space-y-4'>
          <h1 className='header'>Welcome 👋</h1>
          <p className='text-dark-700'>Let us know more about you.</p>
        </section>

        <section className='space-y-6'>
          <div className='space-y-1 mb-9'>
            <h2 className='sub-header'>Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FORM_FIELD_TYPE.INPUT}
          name={'name'}
          label={'Full name'}
          placeholder={'Aks'}
          icon={'/assets/icons/user.svg'}
        />

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.INPUT}
            name={'phone'}
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
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.DATE_PICKER}
            name={'birthDate'}
            label={'Date of Birth'}
          />

          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.SKELETON}
            name={'gender'}
            label={'Gender'}
            renderSkeleton={field => (
              <FormControl>
                <RadioGroup
                  className='flex h-11 gap-6 xl:justify-between'
                  onChange={field.onChange}
                  defaultValue={field.value}>
                  <Each
                    of={GenderOptions}
                    render={option => (
                      <div className='radio-group'>
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className='cursor-pointer'>
                          {option}
                        </Label>
                      </div>
                    )}
                  />
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.INPUT}
            name={'address'}
            label={'Address'}
            placeholder={'3rd Street, xyz'}
          />

          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.INPUT}
            name={'occupation'}
            label={'Occupation'}
            placeholder={'Software Engineer'}
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.INPUT}
            name={'emergencyContactName'}
            label={'Emergency Contact Name'}
            placeholder={"Guardian's Name"}
          />

          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.PHONE_INPUT}
            name={'emergencyContactNumber'}
            label={'Emergency Contact Number'}
            placeholder={'(+91) 1234567890'}
          />
        </div>

        <section className='space-y-6'>
          <div className='space-y-1 mb-9'>
            <h2 className='sub-header'>Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FORM_FIELD_TYPE.SELECT}
          name={'primaryPhysician'}
          label={'Primary Physician'}
          placeholder={'Select a doctor'}>
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

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.INPUT}
            name={'insuranceProvider'}
            label={'Insurance Provider'}
            placeholder={'Plus Medicare'}
          />

          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.INPUT}
            name={'insurancePolicyNumber'}
            label={'Insurance Policy Number'}
            placeholder={'INS1234567890'}
          />
        </div>

        <div className='flex flex-col gap-6 xl:flex-row'>
          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.TEXTAREA}
            name={'allergies'}
            label={'Allergies'}
            placeholder={'Enter allergies here'}
          />

          <CustomFormField
            control={form.control}
            fieldType={FORM_FIELD_TYPE.TEXTAREA}
            name={'currentMedication'}
            label={'Current Medication (if any)'}
            placeholder={'Enter current medications here'}
          />
        </div>

        <SubmitButton isLoading={isLoading}>Get started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm
