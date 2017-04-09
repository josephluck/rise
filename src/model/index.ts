import * as Blog from './blog'
import * as Cart from './cart'
import * as Products from './products'

export type Models = Helix.Models<
  Blog.Namespace &
  Cart.Namespace &
  Products.Namespace &
  { 'location': { state: Helix.LocationState, actions: Helix.LocationActions<Models> } }
>

export default function () {
  return {
    state: {
      foo: 'foo',
    },
    reducers: {},
    effects: {},
    models: {
      [Blog.namespace]: Blog.model(),
      [Cart.namespace]: Cart.model(),
      [Products.namespace]: Products.model(),
    },
  }
}
