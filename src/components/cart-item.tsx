/*import h from 'helix-react/lib/html'
import {CartEntry} from '../model/cart'
import Select from './select'

export interface CartItemProps extends CartEntry {
  updateQuantity: (quantity: number) => any
  removeItem: () => any
}
const CartItem = ({
  id,
  name,
  price,
  quantity,
  description,
  updateQuantity,
  removeItem,
}: CartItemProps) => {
  return (
    <div className='pv-4 bb bc-grey-100 d-flex align-items-center'>
      <div className='bra-2 bg-grey-100 w-6 h-6 mr-4'></div>
      <div className='flex-1 d-flex flex-direction-column of-hidden mr-4'>
        <div className='mb-2'>{name}</div>
        <div
          className='fs-small of-hidden w-100'
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </div>
      </div>
      <div>
        <Select
          className='w-100 mb-2'
          value={quantity.toString()}
          onChange={(quantity) => {
            if (quantity === '0') {
              return removeItem()
            }
            return updateQuantity(parseInt(quantity, 10))
          }}
          options={[
            {label: 'Remove', value: '0'},
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
        <div className='fs-large ta-r'>{'£'}{price * quantity}{'.00'}</div>
      </div>
    </div>
  )
}

export default CartItem*/


import h from 'helix-react/lib/html'
import {CartEntry} from '../model/cart'
import Stepper from './stepper'

export interface CartItemProps extends CartEntry {
  updateQuantity: (quantity: number) => any
  removeItem: () => any
}
const CartItem = ({
  id,
  name,
  price,
  quantity,
  description,
  updateQuantity,
  removeItem,
}: CartItemProps) => {
  return (
    <div className='pv-4 bb bc-grey-100 d-flex align-items-center'>
      {/*<div className='bra-2 bg-grey-100 w-6 h-6 mr-3'></div>*/}
      <div className='flex-1 d-flex flex-direction-column of-hidden mr-3'>
        <div className='mb-2'>{name}</div>
        <div
          className='fs-small of-hidden w-100 fc-grey-600'
          style={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </div>
      </div>
      <div className='ta-r'>
        <Stepper
          className='mb-2'
          value={quantity.toString()}
          onChange={(quantity) => {
            if (quantity === '0') {
              return removeItem()
            }
            return updateQuantity(parseInt(quantity, 10))
          }}
        />
        <div className='fs-large'>{'£'}{price * quantity}{'.00'}</div>
      </div>
    </div>
  )
}

export default CartItem
