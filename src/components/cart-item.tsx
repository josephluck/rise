import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import Stepper from './stepper'
import Currency from './currency'

export interface CartItemProps extends Core.CartEntry {
  showControls: boolean
  updateQuantity: (quantity: number) => any
  removeItem: () => any
  className?: string
}
const CartItem = ({
  showControls,
  id,
  title,
  images,
  price,
  quantity,
  description,
  updateQuantity,
  removeItem,
  className = '',
}: CartItemProps) => {
  return (
    <div className={`bc-grey-100 d-flex align-items-center ${className}`}>
      <a href={`/shop/${id}`}>
        <img
          className='w-5 h-5 mr-3'
          src={images[0]}
        />
      </a>
      <div className='flex-1 mr-3 fs-small'>
        <Collapse hasNestedCollapse isOpened={!showControls}>
          <div className='pb-1 fc-grey-600 fs-tiny tt-uppercase'>
            Qty: {quantity}
          </div>
        </Collapse>
        {title}
      </div>
      <div className='ta-r'>
        <Collapse hasNestedCollapse isOpened={showControls}>
          <div className='of-hidden'>
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
          </div>
        </Collapse>
        <div className='fs-regular'>{'£'}<Currency price={price * quantity} /></div>
      </div>
    </div>
  )
}

export default CartItem
