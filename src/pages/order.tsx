import h from 'helix-react/lib/html'
import { Models } from '../model'

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
          Order details
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
