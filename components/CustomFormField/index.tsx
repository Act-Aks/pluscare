'use client'

import 'react-datepicker/dist/react-datepicker.css'
import 'react-phone-number-input/style.css'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Image from 'next/image'
import DatePicker from 'react-datepicker'
import { Control, ControllerRenderProps, FieldPath, FieldValues } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectTrigger, SelectValue } from '../ui/select'
import { Textarea } from '../ui/textarea'
import { FORM_FIELD_TYPE } from './CustomFormField.static'

type CustomFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>
  name: TName
  fieldType: FORM_FIELD_TYPE
  label?: string
  placeholder?: string
  icon?: string
  disabled?: boolean
  dateFormat?: string
  showTimeSelect?: boolean
  children?: React.ReactNode
  renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  field,
  ...props
}: CustomFormFieldProps<TFieldValues, TName> & {
  field: ControllerRenderProps<TFieldValues, TName>
}) => {
  const {
    children,
    dateFormat,
    disabled,
    fieldType,
    icon,
    name,
    placeholder,
    renderSkeleton,
    showTimeSelect,
  } = props

  switch (fieldType) {
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
    case FORM_FIELD_TYPE.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src={'/assets/icons/calendar.svg'}
            alt={'calendar'}
            height={24}
            width={24}
            className='ml-2'
          />
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={date => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel={'Time:'}
              wrapperClassName='date-picker'
            />
          </FormControl>
        </div>
      )
    case FORM_FIELD_TYPE.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} value={field.value}>
            <FormControl>
              <SelectTrigger className='shad-select-trigger'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>{children}</SelectContent>
          </Select>
        </FormControl>
      )
    case FORM_FIELD_TYPE.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            className='shad-textArea'
            disabled={disabled}
          />
        </FormControl>
      )
    case FORM_FIELD_TYPE.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null

    default:
      return <Input type='text' {...field} />
  }
}

const CustomFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: CustomFormFieldProps<TFieldValues, TName>,
) => {
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
