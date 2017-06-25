import h from 'helix-react/lib/html'

export interface Props {
  name: string
  avatar: string
  description: string
  className?: string
}

export default function ({
  name,
  className,
  avatar,
  description,
}: Props) {
  return (
    <div className={`${className || ''}`}>
      <img
        src={avatar}
        className='w-100 h-auto of-hidden d-ib mb-2'
      />
      <div className='mb-1 fw-500'>
        {name}
      </div>
      <div className='fc-grey-500'>
        {description}
      </div>
    </div>
  )
}
