import h from 'helix-react/lib/html'
import Currency from './currency'
import { Product } from '../model/products'

export interface Props extends Product {
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
        src={images[0].url.http}
        className='w-100 h-auto of-hidden d-ib mb-2'
      />
      <div className='mb-1 fw-500'>
        {title}
      </div>
      <div className='fc-grey-500'>
        {'£'}<Currency price={price.data.raw.with_tax} />
      </div>
    </div>
  )
}
