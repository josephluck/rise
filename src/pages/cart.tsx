import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import {Models} from '../model'
import CartItem from '../components/cart-item'
import Button from '../components/button'
import Currency from '../components/currency'
import CustomerForm from '../components/forms/customer-form'

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

type Mode = 'cart' | 'checkout'

const page = (mode: Mode): Helix.Page<Models> => ({
  onEnter (state, _prev, actions) {
    if (!state.cart.items.length) {
      actions.location.set('/shop')
    }
  },
  view (state, prev, actions) {
    return (
      <div className='ph-3 pb-4'>
        {state.cart.items.map((item, index) => {
          return (
            <CartItem
              key={index}
              showControls={mode === 'cart'}
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
        <Collapse isOpened={mode === 'checkout'}>
          <CustomerForm
            fields={state.cart.customer.fields}
            errors={state.cart.customer.errors}
            setFields={actions.cart.customer.setFields}
          />
        </Collapse>
        <div className='mv-4 d-flex'>
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
        {mode === 'cart'
          ? (
            <Button
              label='Checkout'
              className='w-100 bg-transparent ta-c'
              href='/checkout'
            />
          ) : null
        }
        {mode === 'checkout'
          ? (
            <Button
              label='Pay Now'
              className='w-100 bg-transparent ta-c'
              href='/cart'
            />
          ) : null
        }
      </div>
    )
  },
})

export default page
