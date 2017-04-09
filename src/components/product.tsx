import h from 'helix-react/lib/html'
import Button from './button'
import Select from './select'
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
          <div className='fc-grey-700 mb-3'>from £{price}{'.00'}</div>
          <div className='lh-5'>{description}</div>
        </div>
        <div className='d-flex'>
          <Select
            className='flex-1 mr-2'
            placeholder='Quantity'
            options={[
              {label: '1', value: '1'},
              {label: '2', value: '2'},
              {label: '3', value: '3'},
              {label: '4', value: '4'},
              {label: '5', value: '5'},
              {label: '6', value: '6'},
              {label: '7', value: '7'},
              {label: '8', value: '8'},
              {label: '9', value: '9'},
              {label: '10', value: '10'},
            ]}
          />
          <Button
            size='small'
            label='Add to Cart'
            className='flex-1 ml-2'
          />
        </div>
      </div>
    </div>
  )
}
