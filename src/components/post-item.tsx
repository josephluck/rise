import h from 'helix-react/lib/html'
import Html from '../components/html'

export interface Props extends Core.Post {
  className?: string
}

export default function ({
  className,
  title,
  excerpt,
  author,
  id,
  thumbnail,
}: Props) {
  return (
    <div className={`${className}`}>
      <a className='d-flex mb-3' href={`/blog/${id}`}>
        <div
          className='bg-grey-100 w-5 h-5 mr-3'
          style={{
            backgroundImage: `url(${thumbnail})`,
            backgroundPosition: 'center center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className='flex-1 d-flex flex-direction-column'>
          <div className='mb-1 fw-500 flex-1'>{title}</div>
          <div className='fs-small fc-grey-600 lh-5'>By {author.name}</div>
        </div>
      </a>
      <div className='fs-small fc-grey-600 lh-5'>
        <Html>
          {excerpt}
        </Html>
      </div>
    </div>
  )
}
