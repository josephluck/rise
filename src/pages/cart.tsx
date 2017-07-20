import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import { Models } from '../model'
import CartItemsList from '../components/cart-items-list'
import Button from '../components/button'
import CustomerForm from '../components/forms/customer-form'
import ShippingForm from '../components/forms/shipping-form'
import BillingForm from '../components/forms/billing-form'
import Totals from '../components/totals'
import Section from '../components/checkout-section'
import * as fixtures from '../utils/fixtures'

type Mode = 'cart' | 'checkout'

const stringify = (strings: Record<string, string>): string => {
  return Object.keys(strings).reduce((prev, key) => prev.concat(strings[key]), [])
    .filter(str => str.length)
    .join(', ')
}

const page = (mode: Mode): Helix.Page<Models> => ({
  onEnter(state, _prev, actions) {
    if (!state.cart.items.length) {
      actions.location.set('/shop')
    }
    if (!state.checkout.shippingMethods.length) {
      actions.checkout.getShippingMethods()
    }
  },
  view(state, prev, actions) {
    return (
      <div className='pb-4 ph-3'>
        <CartItemsList
          items={state.cart.items}
          className={`mb-3 ba bc-grey-100 ${mode === 'checkout' ? 'd-b d-n-l' : ''}`}
          showControls={mode === 'cart'}
          updateQuantity={(item, quantity, index) => actions.cart.update({
            index,
            item: {
              ...item,
              quantity,
            },
          })}
          removeItem={(index) => actions.cart.remove(index)}
        />
        <div className='d-flex'>
          <div className='flex-2'>
            <Collapse
              hasNestedCollapse
              isOpened={mode === 'checkout'}
            >
              <div className='pb-4-l'>
                <div className='pb-3'>
                  <Section
                    isComplete={state.checkout.customer.valid}
                    hasErrors={!state.checkout.customer.valid && state.checkout.customer.submitted}
                    formShowing={state.checkout.sectionShowing === 1}
                    label='Your Details'
                    description={stringify({
                      firstName: state.checkout.customer.fields.firstName,
                      lastName: state.checkout.customer.fields.lastName,
                    })}
                    form={(
                      <CustomerForm
                        fields={state.checkout.customer.fields}
                        errors={state.checkout.customer.errors}
                        setFields={payload => {
                          actions.checkout.customer.setFields(payload)
                          actions.checkout.shipping.setFields(payload)
                          actions.checkout.billing.setFields(payload)
                        }}
                      />
                    )}
                    toggleFormShowing={() => {
                      actions.checkout.setSectionShowing(1)
                    }}
                  />
                </div>
                <div className='pb-3'>
                  <Section
                    isComplete={state.checkout.shipping.valid}
                    hasErrors={!state.checkout.shipping.valid && state.checkout.shipping.submitted}
                    formShowing={state.checkout.sectionShowing === 2}
                    label='Shipping'
                    description={stringify({
                      line1: state.checkout.shipping.fields.line1,
                      line2: state.checkout.shipping.fields.line2,
                      city: state.checkout.shipping.fields.city,
                      county: state.checkout.shipping.fields.county,
                      postcode: state.checkout.shipping.fields.postcode,
                    })}
                    form={(
                      <ShippingForm
                        fields={state.checkout.shipping.fields}
                        errors={state.checkout.shipping.errors}
                        setFields={payload => {
                          actions.checkout.shipping.setFields(payload)
                          actions.checkout.calculateTotals(state.cart)
                          if (state.checkout.controls.fields.billingIsSameAsShipping) {
                            actions.checkout.billing.setFields(payload)
                          }
                        }}
                        shippingMethods={state.checkout.shippingMethods}
                      />
                    )}
                    toggleFormShowing={() => {
                      actions.checkout.setSectionShowing(2)
                    }}
                  />
                </div>
                <div>
                  <Section
                    isComplete={state.checkout.billing.valid}
                    hasErrors={!state.checkout.billing.valid && state.checkout.billing.submitted}
                    formShowing={state.checkout.sectionShowing === 3}
                    label='Billing'
                    form={(
                      <BillingForm
                        fields={state.checkout.billing.fields}
                        errors={state.checkout.billing.errors}
                        setFields={actions.checkout.billing.setFields}
                        useShippingAddress={state.checkout.controls.fields.billingIsSameAsShipping}
                        toggleUseShippingAddress={billingIsSameAsShipping => {
                          actions.checkout.controls.setFields({
                            billingIsSameAsShipping,
                          })
                          if (billingIsSameAsShipping) {
                            actions.checkout.billing.setFields(state.checkout.shipping.fields)
                          } else {
                            actions.checkout.billing.setFields(fixtures.address())
                          }
                        }}
                      />
                    )}
                    toggleFormShowing={() => {
                      actions.checkout.setSectionShowing(3)
                    }}
                  />
                </div>
              </div>
              <Totals
                className='pv-4 d-b d-n-l'
                totals={state.checkout.totals}
              />
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
          {mode === 'checkout'
            ? (
              <div className='flex-1 d-n d-b-l ml-3'>
                <CartItemsList
                  items={state.cart.items}
                  className={`mb-3 ba bc-grey-100`}
                  showControls={true}
                  updateQuantity={(item, quantity, index) => actions.cart.update({
                    index,
                    item: {
                      ...item,
                      quantity,
                    },
                  })}
                  removeItem={(index) => actions.cart.remove(index)}
                />
                <Totals
                  totals={state.checkout.totals}
                />
              </div>
            ) : null
          }
        </div>
      </div>
    )
  },
})

export default page
