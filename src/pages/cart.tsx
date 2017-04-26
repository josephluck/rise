import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import {Models} from '../model'
import CartItem from '../components/cart-item'
import Button from '../components/button'
import Currency from '../components/currency'
import Textfield from '../components/textfield'

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
          <div className='of-hidden pt-4'>
            <Textfield
              label='Name'
              className='pb-3'
              value={state.cart.customer.fields.name}
              errors={state.cart.customer.errors.name}
              onChange={val => actions.cart.customer.setFields({name: val})}
              autoFocus
            />
            <Textfield
              label='Email'
              className='pb-3'
              value={state.cart.customer.fields.email}
              errors={state.cart.customer.errors.email}
              onChange={val => actions.cart.customer.setFields({email: val})}
            />
            <Textfield
              label='Address Line 1'
              className='pb-3'
              value={state.cart.customer.fields.name}
              errors={state.cart.customer.errors.name}
              onChange={val => actions.cart.customer.setFields({name: val})}
            />
            <Textfield
              label='Address Line 2'
              className='pb-3'
              value={state.cart.customer.fields.name}
              errors={state.cart.customer.errors.name}
              onChange={val => actions.cart.customer.setFields({name: val})}
            />
            <Textfield
              label='Address Line 3'
              className='pb-3'
              value={state.cart.customer.fields.name}
              errors={state.cart.customer.errors.name}
              onChange={val => actions.cart.customer.setFields({name: val})}
            />
            <Textfield
              label='Town'
              className='pb-3'
              value={state.cart.customer.fields.name}
              errors={state.cart.customer.errors.name}
              onChange={val => actions.cart.customer.setFields({name: val})}
            />
            <Textfield
              label='County'
              className='pb-3'
              value={state.cart.customer.fields.name}
              errors={state.cart.customer.errors.name}
              onChange={val => actions.cart.customer.setFields({name: val})}
            />
            <Textfield
              label='Post Code'
              value={state.cart.customer.fields.name}
              errors={state.cart.customer.errors.name}
              onChange={val => actions.cart.customer.setFields({name: val})}
            />
          </div>
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
