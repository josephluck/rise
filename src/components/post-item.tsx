import h from 'helix-react/lib/html'
import { Post } from '../model/blog'

export interface Props extends Post {
  className?: string
}

export default function ({
  className,
  title,
  description,
  by,
  id,
}: Props) {
  return (
    <div className={`${className}`}>
      <a className='d-flex mb-3' href={`/blog/${id}`}>
        <div className='bg-grey-100 w-5 h-5 mr-3'></div>
        <div className='flex-1 d-flex flex-direction-column'>
          <div className='mb-1 fw-500 flex-1'>{title}</div>
          <div className='fs-small fc-grey-600 lh-5'>By {by}</div>
        </div>
      </a>
      <div className='fs-small fc-grey-600 lh-5'>{description}{'...'}</div>
    </div>
  )
}
