import { cn } from '@/lib/utils'

type Props = {
  email:string
  size?: string
}

const Avatar = ({email, size}: Props) => {
  const firstTwo = email.slice(0, 2);
  return (
    <div className={cn('size-16 flex items-center justify-center bg-blue-600 text-white rounded-full', size)}>
      <span className='text-2xl tracking-wider font-medium uppercase'>{firstTwo}</span>
    </div>
  )
}

export default Avatar