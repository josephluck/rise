import {Models} from './'

export interface CartEntry {
  id: number
  price: number
  quantity: number
}

export interface State {
  subTotal: number
  quantity: number
  items: CartEntry[]
}

export interface Reducers {
  add: Helix.Reducer<Models, State, CartEntry>
}

export interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'cart'
export interface Namespace { 'cart': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model (): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      items: [],
      subTotal: 0,
      quantity: 0,
    },
    reducers: {
      add (state, item) {
        const items = state.items.concat(item)
        return {
          items,
          subTotal: total(items),
          quantity: quantity(items),
        }
      },
    },
    effects: {},
  }
}

function total (items: CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + (curr.price * curr.quantity)
  }, 0)
}

function quantity (items: CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + curr.quantity
  }, 0)
}
