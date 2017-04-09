import h from 'helix-react/lib/html'
import Button from './button'
import {Product} from '../model/products'

export interface Props extends Product {
  className?: string
}

export default function ({
  name,
  price,
  description,
  className = '',
}: Props) {
  return (
    <div className={`${className}`}>
      <div className='h-9 bg-grey-100 btlr-2 btrr-2 of-hidden' />
      <div className='bl bb br bc-grey-100 pa-3 bblr-2 bbrr-2 ta-c'>
        <div className='mb-4'>
          <div className='fw-500 mb-3 fs-large'>{name}</div>
          <div className='fc-grey-700 mb-3'>£{price}{'.00'}</div>
          <div className='lh-5 fs-small'>{description}</div>
        </div>
        <Button
          size='small'
          label='Add to Cart'
          className='w-100'
        />
      </div>
    </div>
  )
}
