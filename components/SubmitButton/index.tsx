import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { Button } from '../ui/button'

type SubmitButtonProps = PropsWithChildren<{
  className?: string
  isLoading?: boolean
}>

const SubmitButton: React.FC<SubmitButtonProps> = ({ isLoading, className, children }) => {
  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'shad-primary-btn w-full'}>
      {isLoading ? (
        <div className='flex items-center gap-4'>
          <Image
            src={'/assets/icons/loader.svg'}
            alt={'loader'}
            width={24}
            height={24}
            className='animate-spin'
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

export default SubmitButton
