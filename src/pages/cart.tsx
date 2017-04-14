import h from 'helix-react/lib/html'
import {Models} from '../model'
import CartItem from '../components/cart-item'
import Button from '../components/button'
import Currency from '../components/currency'

interface LineItemProps {
  label: string
  amount: number
  className?: string
}

function LineItem ({
  label,
  amount,
  className,
}: LineItemProps) {
  return (
    <div className={`ta-c ${className}`}>
      <div className='pb-2 fs-small tt-uppercase'>{label}</div>
      <div className='fs-medium'>{'£'}<Currency price={amount} /></div>
    </div>
  )
}

const page: Helix.Page<Models> = {
  onEnter (state, _prev, actions) {
    if (!state.cart.items.length) {
      actions.location.set('/shop')
    }
  },
  view (state, prev, actions) {
    return (
      <div className='ph-4 pb-4 pt-3'>
        {state.cart.items.map((item, index) => {
          return (
            <CartItem
              key={index}
              updateQuantity={(quantity) => actions.cart.update({
                index,
                item: {
                  ...item,
                  quantity,
                },
              })}
              removeItem={() => actions.cart.remove(index)}
              {...item}
            />
          )
        })}
        <div className='pv-4 d-flex'>
          <LineItem
            label='Sub Total'
            amount={state.cart.subTotal}
            className='flex-1 fc-grey-700'
          />
          <LineItem
            label='Shipping'
            amount={state.cart.shipping}
            className='flex-1 fc-grey-700'
          />
          <LineItem
            label='Total'
            amount={state.cart.subTotal + state.cart.shipping}
            className='flex-1'
          />
        </div>
        <Button
          label='Checkout'
          className='w-100 bg-transparent'
        />
      </div>
    )
  },
}

export default page
