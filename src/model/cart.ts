import { Apis } from '../bootstrap'
import { Models } from './'

export interface State {
  items: Core.CartEntry[]
}

export interface Reducers {
  reset: Helix.Reducer0<Models, State>
  doSync: Helix.Reducer<Models, State, Core.Cart>
}

export interface Effects {
  sync: Helix.Effect0<Models>
  add: Helix.Effect<Models, Core.CartEntry>
  remove: Helix.Effect<Models, number>
  update: Helix.Effect<Models, {
    index: number,
    item: Core.CartEntry,
  }>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'cart'
export interface Namespace { 'cart': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function defaultState() {
  return {
    items: [],
  }
}

export function model({
  shop,
}: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: defaultState(),
    reducers: {
      reset: defaultState,
      doSync(state, cart) {
        return {
          items: cart.items,
        }
      },
    },
    effects: {
      sync(state, actions) {
        return shop.cart.get(state.user.token)
          .then(actions.cart.doSync)
          .then(state => actions.checkout.calculateTotals(state.cart))
          .catch(actions.cart.reset)
      },
      add(state, actions, newItem) {
        return shop.cart.insert(state.user.token, newItem.id, newItem.quantity)
          .then(actions.cart.sync)
      },
      remove(state, actions, index) {
        const id = state.cart.items[index].id
        return shop.cart.remove(state.user.token, id)
          .then(actions.cart.sync)
      },
      update(state, actions, { index, item }) {
        const id = state.cart.items[index].id
        return shop.cart.update(state.user.token, id, item.quantity)
          .then(actions.cart.sync)
      },
    },
  }
}
