'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Image from 'next/image'
import { Control } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { Input } from '../ui/input'
import { FORM_FIELD_TYPE } from './CustomFormField.static'

type CustomFormFieldProps = {
  control: Control<any>
  fieldType: FORM_FIELD_TYPE
  name: string
  label?: string
  placeholder?: string
  icon?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, ...props }: { field: any } & CustomFormFieldProps) => {
  const { fieldType, renderSkeleton, icon, placeholder, name } = props

  switch (props.fieldType) {
    case FORM_FIELD_TYPE.INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          {icon && (
            <Image src={icon} alt={`${name}-icon`} width={24} height={24} className='ml-2' />
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} className='shad-input border-0' />
          </FormControl>
        </div>
      )
    case FORM_FIELD_TYPE.PHONE_INPUT:
      return (
        <PhoneInput
          defaultCountry={'IN'}
          placholder={placeholder}
          international
          withCountryCallingCode
          value={field.value}
          onChange={field.onChange}
          className='input-phone'
        />
      )
    case FORM_FIELD_TYPE.DATE:
      return <Input type='date' {...field} />
    case FORM_FIELD_TYPE.TIME:
      return <Input type='time' {...field} />
    case FORM_FIELD_TYPE.TEXTAREA:
      return <Input type='textarea' {...field} />
    default:
      return <Input type='text' {...field} />
  }
}

const CustomFormField: React.FC<CustomFormFieldProps> = props => {
  const {
    control,
    fieldType,
    name,
    label,
    placeholder,
    icon,
    disabled,
    dateFormat,
    showTimeSelect,
    children,
    renderSkeleton,
  } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FORM_FIELD_TYPE.CHECKBOX && label && <FormLabel>{label}</FormLabel>}
          <RenderField field={field} {...props} />
          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  )
}

export default CustomFormField
