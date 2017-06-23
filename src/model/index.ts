import * as Blog from './blog'
import * as Cart from './cart'
import * as Products from './products'
import * as Checkout from './checkout'

export type Models = Helix.Models<
  Blog.Namespace &
  Cart.Namespace &
  Products.Namespace &
  Checkout.Namespace &
  { 'location': { state: Helix.LocationState, actions: Helix.LocationActions<Models> } }
  >

export default function (apis) {
  return {
    state: {},
    reducers: {},
    effects: {},
    models: {
      [Blog.namespace]: Blog.model(),
      [Cart.namespace]: Cart.model(),
      [Products.namespace]: Products.model(apis),
      [Checkout.namespace]: Checkout.model(),
    },
  }
}
