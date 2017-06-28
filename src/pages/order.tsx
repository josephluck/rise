import h from 'helix-react/lib/html'
import { Models } from '../model'
import ProductList from '../components/cart-items-list'
import Totals from '../components/totals'
import CollapsableSection from '../components/collapsable-section'
import DisplayFields from '../components/display-fields'

const page: Helix.Page<Models> = {
  onEnter(state, _prev, actions) {
    if (!state.orders.order) {
      actions.orders.fetch(state.location.params.orderId)
    }
  },
  onLeave(state, _prev, actions) {
    actions.orders.reset()
  },
  view(state, prev, actions) {
    const order = state.orders.order
    if (order) {
      return (
        <div>
          <div className='mb-3'>
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

          <div className='mb-3'>
            <CollapsableSection
              label='Shipping Information'
              defaultOpen={true}
            >
              <DisplayFields
                fields={[
                  { label: 'First Name', value: order.shippingAddress.firstName },
                  { label: 'Last Name', value: order.shippingAddress.lastName },
                  { label: 'Line 1', value: order.shippingAddress.line1 },
                  { label: 'Line 2', value: order.shippingAddress.line2 },
                ]}
              />
            </CollapsableSection>
          </div>

          <div className='mb-3'>
            <CollapsableSection
              label='Payment Information'
              defaultOpen={true}
            >
            </CollapsableSection>
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading</div>
      )
    }
  },
}

export default page
