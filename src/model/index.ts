import * as Products from './products'

export type Models = Helix.Models<
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
      [Products.namespace]: Products.model(),
    },
  }
}
