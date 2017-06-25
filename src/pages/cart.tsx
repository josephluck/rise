import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import { Models } from '../model'
import CartItem from '../components/cart-item'
import Button from '../components/button'
import CustomerForm from '../components/forms/customer-form'
import ShippingForm from '../components/forms/shipping-form'
import BillingForm from '../components/forms/billing-form'
import LineItem from '../components/line-item'
import Section from '../components/checkout-section'

type Mode = 'cart' | 'checkout'

const stringify = (strings: any): string => {
  return Object.keys(strings).reduce((prev, key) => prev.concat(strings[key]), [])
    .filter(str => str.length)
    .join(', ')
}

const page = (mode: Mode): Helix.Page<Models> => ({
  onEnter(state, _prev, actions) {
    if (!state.cart.items.length) {
      actions.location.set('/shop')
    }
    actions.checkout.getShippingMethods()
  },
  view(state, prev, actions) {
    return (
      <div className='pb-4'>
        <div className='ba bc-grey-100 mb-3'>
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
                className={`pa-3 ${index !== 0 ? 'bt' : ''}`}
                {...item}
              />
            )
          })}
        </div>
        <Collapse
          hasNestedCollapse
          isOpened={mode === 'checkout'}
        >
          <div>
            <div className='pb-3'>
              <Section
                id={1}
                complete={state.checkout.customer.valid}
                formShowing={state.checkout.sectionShowing === 1}
                label='Your Details'
                description={stringify(state.checkout.customer.fields)}
                form={(
                  <CustomerForm
                    fields={state.checkout.customer.fields}
                    errors={state.checkout.customer.errors}
                    setFields={actions.checkout.customer.setFields}
                  />
                )}
                toggleFormShowing={() => {
                  actions.checkout.setKey({ sectionShowing: 1 })
                  actions.checkout.validateSections()
                }}
              />
            </div>
            <div className='pb-3'>
              <Section
                id={2}
                complete={state.checkout.shipping.valid}
                formShowing={state.checkout.sectionShowing === 2}
                label='Shipping'
                description={stringify(state.checkout.shipping.fields)}
                form={(
                  <ShippingForm
                    fields={state.checkout.shipping.fields}
                    errors={state.checkout.shipping.errors}
                    setFields={actions.checkout.shipping.setFields}
                    shippingMethods={state.checkout.shippingMethods}
                  />
                )}
                toggleFormShowing={() => {
                  actions.checkout.setKey({ sectionShowing: 2 })
                  actions.checkout.validateSections()
                }}
              />
            </div>
            <div>
              <Section
                id={3}
                complete={state.checkout.billing.valid}
                formShowing={state.checkout.sectionShowing === 3}
                label='Billing'
                description={stringify(state.checkout.billing.fields)}
                form={(
                  <BillingForm
                    fields={state.checkout.billing.fields}
                    errors={state.checkout.billing.errors}
                    setFields={actions.checkout.billing.setFields}
                    useShippingAddress={state.checkout.controls.fields.billingIsSameAsShipping}
                    toggleUseShippingAddress={billingIsSameAsShipping => actions.checkout.controls.setFields({
                      billingIsSameAsShipping,
                    })}
                  />
                )}
                toggleFormShowing={() => {
                  actions.checkout.setKey({ sectionShowing: 3 })
                  actions.checkout.validateSections()
                }}
              />
            </div>
          </div>
          <div className='pv-4 d-flex'>
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
        </Collapse>
        {mode === 'cart'
          ? (
            <Button
              label='Checkout'
              className='w-100 bg-transparent ta-c bra-pill'
              href='/checkout'
            />
          ) : null
        }
        {mode === 'checkout'
          ? (
            <Button
              label='Pay'
              className='w-100 bg-transparent ta-c bra-pill'
              onClick={actions.checkout.submit}
            />
          ) : null
        }
      </div>
    )
  },
})

export default page
