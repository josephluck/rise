import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import { Models } from '../model'
import CartItem from '../components/cart-item'
import Button from '../components/button'
import CustomerForm from '../components/forms/customer-form'
import AddressForm from '../components/forms/address-form'
import Textfield from '../components/textfield'
import LineItem from '../components/line-item'
import Show from '../components/show'

interface SectionProps {
  index: number
  complete: boolean
  formShowing: boolean
  label: React.ReactNode
  description: React.ReactNode
  form: React.ReactNode
  toggleFormShowing: () => any
}

function Section ({
  index,
  complete,
  formShowing,
  label,
  description,
  form,
  toggleFormShowing,
}: SectionProps) {
  return (
    <div>
      <div className='d-flex align-items-center pa-3'>
        <div className='fs-large mr-3'>
          {complete
            ? <span className='ss-check' />
            : index
          }
        </div>
        <div className='flex-1'>
          <div className={`fw-500 ${formShowing ? 'fs-large' : ''}`}>
            {label}
          </div>
          <Show showing={!formShowing}>
            <div className='fs-small pt-2'>
              {description}
            </div>
          </Show>
        </div>
        <Show showing={!formShowing}>
          Change
        </Show>
      </div>
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
              <Section
                index={1}
                complete={false}
                formShowing={false}
                label='Your Details'
                description='Joseph Luck, joseph.luck@sky.com'
                form={(
                  <CustomerForm
                    fields={state.checkout.customer.fields}
                    errors={state.checkout.customer.errors}
                    setFields={actions.checkout.customer.setFields}
                  />
                )}
                toggleFormShowing={() => console.log('Toggle the form')}
              />
            </div>
            <div className='pb-3'>
              <AddressForm
                fields={state.checkout.billing.fields}
                errors={state.checkout.billing.errors}
                setFields={actions.checkout.billing.setFields}
              />
            </div>
            <div className='pb-3'>
              <label>
                <input
                  type='checkbox'
                  checked={state.checkout.controls.fields.shippingIsSameAsBilling}
                  onChange={() => actions.checkout.controls.setFields({
                    shippingIsSameAsBilling: !state.checkout.controls.fields.shippingIsSameAsBilling,
                  })}
                />
                Shipping Address Is Same As Billing Address
              </label>
              <Collapse hasNestedCollapse isOpened={!state.checkout.controls.fields.shippingIsSameAsBilling}>
                <AddressForm
                  fields={state.checkout.shipping.fields}
                  errors={state.checkout.shipping.errors}
                  setFields={actions.checkout.shipping.setFields}
                />
              </Collapse>
              <Textfield
                label='Additional Instructions'
                className='pt-3'
                value={state.checkout.shipping.fields.instructions}
                errors={state.checkout.shipping.errors.instructions}
                onChange={val => actions.checkout.shipping.setFields({ last_name: val })}
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
