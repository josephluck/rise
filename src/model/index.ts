import Login from './login'

export type Models = Helix.Models<
  Login.Namespace &
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
      [Login.namespace]: Login.model(),
    },
  }
}
