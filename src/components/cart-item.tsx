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
      <div className='flex-1'>
        <span className={`transition ${showControls ? 'fw-500' : ''}`}>{title}</span>
        <div className='mt-2 d-flex align-items-center'>
          <div className='flex-1'>
            <Collapse
              className='w-100'
              hasNestedCollapse
              isOpened={!showControls}
            >
              <div className='fc-grey-600 fs-tiny tt-uppercase'>
                Quantity: <span className='fw-500'>{quantity}</span>
              </div>
            </Collapse>
            <Collapse
              className='w-100'
              hasNestedCollapse
              isOpened={showControls}
            >
              <div className='of-hidden'>
                <Stepper
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
          </div>
          <div className='fs-regular'>
            {'£'}<Currency price={price * quantity} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItem
