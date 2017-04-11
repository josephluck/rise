import {Models} from './'
import {Product} from './products'

export interface CartEntry extends Product {
  quantity: number
}

export interface State {
  subTotal: number
  quantity: number
  shipping: number
  items: CartEntry[]
}

export interface Reducers {
  add: Helix.Reducer<Models, State, CartEntry>
  remove: Helix.Reducer<Models, State, number>
  update: Helix.Reducer<Models, State, {
    index: number,
    item: CartEntry,
  }>
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
      subTotal: 16 * 8,
      quantity: 8,
      shipping: 5,
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
      remove (state, index) {
        const items = state.items.filter((_, i) => i !== index)
        return {
          items,
          subTotal: total(items),
          quantity: quantity(items),
        }
      },
      update (state, {index, item}) {
        const items = state.items.map(i => {
          return i.id === item.id ? item : i
        })
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
    return prev + (curr.price.raw.with_tax * curr.quantity)
  }, 0)
}

function quantity (items: CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + curr.quantity
  }, 0)
}
