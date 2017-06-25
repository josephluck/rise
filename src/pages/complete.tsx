import h from 'helix-react/lib/html'
import { Models } from '../model'
import ProductList from '../components/cart-items-list'
import Totals from '../components/totals'
import CollapsableSection from '../components/collapsable-section'
import DisplayAddress from '../components/display-address'
import DisplayFields from '../components/display-fields'

const page: Helix.Page<Models> = {
  onEnter(state, _prev, actions) {
    if (!state.orders.order) {
      actions.location.set('/shop')
    }
  },
  view(state, prev, actions) {
    const order = state.orders.order
    if (order) {
      return (
        <div>
          <div className='mb-6'>
            <img
              src='/assets/images/thank-you.jpg'
              className='h-auto w-100 mb-3'
            />
            <div className='fs-medium ta-c'>
              Thank You For Your Order
            </div>
          </div>
          <div className='mb-6'>
            <CollapsableSection
              label='Summary'
              defaultOpen={true}
            >
              <div>
                <ProductList
                  className='mb-3'
                  items={order.items}
                />
                <Totals
                  className='pb-3 bc-grey-100 bb'
                  totals={order.totals}
                />
              </div>
            </CollapsableSection>
          </div>

          <div className='mb-6'>
            <CollapsableSection
              label='Shipping Information'
              defaultOpen={true}
            >
              <DisplayAddress
                className='ba bc-grey-100 pa-3'
                address={order.shippingAddress}
              />
            </CollapsableSection>
          </div>

          <div>
            <CollapsableSection
              label='Payment Information'
              defaultOpen={true}
            >
              <div className='ba bc-grey-100 pa-3'>
                <DisplayAddress
                  address={order.billingAddress}
                  className='mb-3'
                />
                <DisplayFields
                  fields={[
                    { label: 'Type', value: order.paymentCard.brand },
                    { label: 'Expiry', value: `${order.paymentCard.expiryMonth} / ${order.paymentCard.expiryYear}` },
                    { label: 'Card Number', value: `**** **** **** ${order.paymentCard.last4}` },
                  ]}
                />
              </div>
            </CollapsableSection>
          </div>
        </div>
      )
    } else {
      return null
    }
  },
}

export default page
