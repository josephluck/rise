import h from 'helix-react/lib/html'
import Currency from './currency'

export interface Props extends Core.Product {
  className?: string
  onAddToCart: (quantity: number) => any
}

export default function ({
  images,
  className,
  description,
  price,
  title,
  onAddToCart,
}: Props) {
  return (
    <div className={`${className || ''}`}>
      <img
        src={images[0]}
        className='w-100 h-auto of-hidden d-ib mb-2'
      />
      <div className='mb-1 fw-500'>
        {title}
      </div>
      <div className='fc-grey-500'>
        {'£'}<Currency price={price} />
      </div>
    </div>
  )
}
