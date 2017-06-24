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
  doSync: Helix.Reducer<Models, State, any[]>
  doAdd: Helix.Reducer<Models, State, Core.CartEntry>
  doRemove: Helix.Reducer<Models, State, number>
  doUpdate: Helix.Reducer<Models, State, {
    index: number,
    item: Core.CartEntry,
  }>
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

function getTotals(items: Core.CartEntry[]) {
  return {
    subTotal: total(items),
    shipping: 0, // TODO: get this
    quantity: quantity(items),
  }
}

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
      doSync(state, items) {
        console.log(items)
        return {
          items: [],
        }
      },
      doAdd(state, newItem) {
        const newItemIndex = state.items.findIndex(i => i.id === newItem.id)
        const getItems = () => {
          if (newItemIndex !== -1) {
            return state.items.map((oldItem, index) => {
              return newItemIndex === index ? {
                ...oldItem,
                quantity: oldItem.quantity + newItem.quantity,
              } : oldItem
            })
          } else {
            return state.items.concat(newItem)
          }
        }
        const items = getItems()
        return {
          items,
          totals: getTotals(items),
        }
      },
      doRemove(state, index) {
        const items = state.items.filter((_, i) => i !== index)
        return {
          items,
          totals: getTotals(items),
        }
      },
      doUpdate(state, { index, item }) {
        const items = state.items.map(i => {
          return i.id === item.id ? item : i
        })
        return {
          items,
          totals: getTotals(items),
        }
      },
    },
    effects: {
      sync(state, actions) {
        return shop.cart.checkout()
          .then(() => actions.cart.doSync([]))
      },
      add(state, actions, newItem) {
        return shop.cart.insert(newItem.id, newItem.quantity)
          .then(shop.cart.checkout)
          .then(resp => {
            console.log(resp)
            return actions.cart.doAdd(newItem)
          })
      },
      remove(state, actions, index) {
        const id = state.cart.items[index].id
        return shop.cart.remove(id)
          .then(() => actions.cart.doRemove(index))
      },
      update(state, actions, { index, item }) {
        const id = state.cart.items[index].id
        return shop.cart.update(id, item.quantity)
          .then(() => actions.cart.doUpdate({ index, item }))
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
