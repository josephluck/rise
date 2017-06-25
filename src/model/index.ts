import * as Blog from './blog'
import * as Cart from './cart'
import * as Products from './products'
import * as Checkout from './checkout'
// import * as User from './user'
import * as Orders from './orders'
import * as Contact from './contact'

export type Models = Helix.Models<
  Blog.Namespace &
  Cart.Namespace &
  Products.Namespace &
  Checkout.Namespace &
  // User.Namespace &
  Orders.Namespace &
  Contact.Namespace &
  { 'location': { state: Helix.LocationState, actions: Helix.LocationActions<Models> } }
  >

export default function (apis) {
  return {
    state: {},
    reducers: {},
    effects: {},
    models: {
      [Blog.namespace]: Blog.model(),
      [Cart.namespace]: Cart.model(apis),
      [Products.namespace]: Products.model(apis),
      [Checkout.namespace]: Checkout.model(apis),
      // [User.namespace]: User.model(apis),
      [Orders.namespace]: Orders.model(apis),
      [Contact.namespace]: Contact.model(),
    },
  }
}
