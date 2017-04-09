import h from 'helix-react/lib/html'
import {Models} from '../model'
import CartItem from '../components/cart-item'
import Button from '../components/button'

interface LineItemProps {
  label: string
  amount: number
}

function LineItem ({label, amount}: LineItemProps) {
  return (
    <div className='ta-c pb-4'>
      <div className='pb-2 fs-small tt-uppercase'>{label}</div>
      <div className='fs-large'>{'£'}{amount}{'.00'}</div>
    </div>
  )
}

const page: Helix.Page<Models> = {
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
        <div className='pt-4'>
          <LineItem label='Sub Total' amount={state.cart.subTotal} />
          <LineItem label='Shipping' amount={state.cart.shipping} />
          <LineItem label='Total' amount={state.cart.subTotal + state.cart.shipping} />
        </div>
        <Button
          label='Checkout'
          className='w-100'
        />
      </div>
    )
  },
}

export default page
