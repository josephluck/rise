import { Apis } from '../bootstrap'
import { Models } from './'

export interface State {
  orders: Core.Order[]
  order: Core.Order | null
}

export interface Reducers {
  reset: Helix.Reducer0<Models, State>
  setOrders: Helix.Reducer<Models, State, Core.Order[]>
  setOrder: Helix.Reducer<Models, State, Core.Order>
}

export interface Effects {
  fetchAll: Helix.Effect0<Models>
  fetch: Helix.Effect<Models, string>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'orders'
export interface Namespace { 'orders': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function emptyState() {
  return {
    orders: [],
    order: null,
  }
}

export function model({
  shop,
}: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: emptyState(),
    reducers: {
      reset: emptyState,
      setOrders(state, orders) {
        return {
          orders,
        }
      },
      setOrder(state, order) {
        return { order }
      },
    },
    effects: {
      fetchAll(state, actions) {
        return shop.orders.getAll(state.user.token)
          .then(actions[namespace].setOrders)
      },
      fetch(state, actions, orderId) {
        return shop.orders.get(state.user.token, orderId)
          .then(actions[namespace].setOrder)
      },
    },
  }
}
