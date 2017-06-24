import { Apis } from '../bootstrap'
import { Models } from './'

interface Totals {
  subTotal: number
  quantity: number
  shipping: number
}

export interface State {
  totals: Totals
  items: Core.CartEntry[]
}

export interface Reducers {
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

export function model({
  shop,
}: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      items: [],
      totals: {
        subTotal: 0,
        quantity: 0,
        shipping: 0,
      },
    },
    reducers: {
      doSync(state, cart) {
        return {
          items: cart.items,
          totals: {
            subTotal: total(cart.items),
            shipping: 0,
            quantity: quantity(cart.items),
          },
        }
      },
    },
    effects: {
      sync(state, actions) {
        return shop.cart.checkout()
          .then(actions.cart.doSync)
      },
      add(state, actions, newItem) {
        return shop.cart.insert(newItem.id, newItem.quantity)
          .then(actions.cart.sync)
      },
      remove(state, actions, index) {
        const id = state.cart.items[index].id
        return shop.cart.remove(id)
          .then(actions.cart.sync)
      },
      update(state, actions, { index, item }) {
        const id = state.cart.items[index].id
        return shop.cart.update(id, item.quantity)
          .then(actions.cart.sync)
      },
    },
  }
}

function total(items: Core.CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + (curr.price * curr.quantity)
  }, 0)
}

function quantity(items: Core.CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + curr.quantity
  }, 0)
}
