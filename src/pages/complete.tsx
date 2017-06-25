import h from 'helix-react/lib/html'
import { Models } from '../model'

const page: Helix.Page<Models> = {
  onEnter(state, _prev, actions) {
    if (!state.orders.order) {
      actions.location.set('/shop')
    }
  },
  view(state, prev, actions) {
    if (state.orders.order) {
      return (
        <div>
          Thank you for your order
        </div>
      )
    } else {
      return null
    }
  },
}

export default page
