import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import { Models } from '../model'
import CartItem from '../components/cart-item'
import Button from '../components/button'
import Currency from '../components/currency'
import CustomerForm from '../components/forms/customer-form'
import AddressForm from '../components/forms/address-form'
import Textfield from '../components/textfield'

interface LineItemProps {
  label: string
  amount: number
  className?: string
}

function LineItem({
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
  onEnter(state, _prev, actions) {
    if (!state.cart.items.length) {
      actions.location.set('/shop')
    }
  },
  view(state, prev, actions) {
    return (
      <div className='pb-4'>
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
              className={index !== 0 ? 'bt' : ''}
              {...item}
            />
          )
        })}
        <Collapse hasNestedCollapse isOpened={mode === 'checkout'}>
          <div>
            <div className='pb-3'>
              <CustomerForm
                fields={state.cart.customer.fields}
                errors={state.cart.customer.errors}
                setFields={actions.cart.customer.setFields}
              />
            </div>
            <div className='pb-3'>
              <AddressForm
                fields={state.cart.billing.fields}
                errors={state.cart.billing.errors}
                setFields={actions.cart.billing.setFields}
              />
            </div>
            <div className='pb-3'>
              <label>
                <input
                  type='checkbox'
                  checked={state.cart.controls.fields.shippingIsSameAsBilling}
                  onChange={() => actions.cart.controls.setFields({
                    shippingIsSameAsBilling: !state.cart.controls.fields.shippingIsSameAsBilling,
                  })}
                />
                Shipping Address Is Same As Billing Address
              </label>
              <Collapse hasNestedCollapse isOpened={!state.cart.controls.fields.shippingIsSameAsBilling}>
                <AddressForm
                  fields={state.cart.shipping.fields}
                  errors={state.cart.shipping.errors}
                  setFields={actions.cart.shipping.setFields}
                />
              </Collapse>
              <Textfield
                label='Additional Instructions'
                className='pt-3'
                value={state.cart.shipping.fields.instructions}
                errors={state.cart.shipping.errors.instructions}
                onChange={val => actions.cart.shipping.setFields({ last_name: val })}
              />
            </div>
          </div>
        </Collapse>
        <div className='mv-4 d-flex'>
          <LineItem
            label='Sub Total'
            amount={state.cart.totals.subTotal}
            className='flex-1 fc-grey-700'
          />
          <LineItem
            label='Shipping'
            amount={state.cart.totals.shipping}
            className='flex-1 fc-grey-700'
          />
          <LineItem
            label='Total'
            amount={state.cart.totals.subTotal + state.cart.totals.shipping}
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
