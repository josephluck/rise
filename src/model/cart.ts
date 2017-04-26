/* tslint:disable */

import {Models} from './'
import * as Form from './form'
import {Product} from './products'

export interface CartEntry extends Product {
  quantity: number
}

export interface LocalState {
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

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface CustomerFields {
  name: string
  email: string
}

export interface BillingAddress {
  first_name: string
  last_name: string
  line_1: string
  line_2: string
  postcode: string
  county: string
}

export interface ShippingAddress extends BillingAddress {
  instructions: string
}

export interface State extends LocalState {
  customer: Form.State<CustomerFields>
}

export interface Actions extends LocalActions {
  customer: Form.Actions<CustomerFields>
}

export const namespace: keyof Namespace = 'cart'
export interface Namespace { 'cart': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model (): Helix.ModelImpl<Models, LocalState, Reducers, Effects> {
  return {
    state: {
      "items": [
        {
          "id": "1490832697893847364",
          "title": "Beetroot brownie",
          "description": "This one uses a little less chocolate, but only because the fresh beetroot absorbs the flavour so well. Already popular here in Shoreditch, we’re sure that this combo is going to be massive. Topped with sunflower seeds to give it some extra crunch.",
          "price": {
            "value": "£14.40",
            "data": {
              "raw": {
                "with_tax": 14.4,
              }
            }
          },
          "images": [
            {
              "url": {
                "http": "http://commercecdn.com/1489725171840320207/29fec8d2-c144-45f9-9dc8-4e8cd6d7e54d.jpeg",
              },
            }
          ],
          "quantity": 1
        }
      ],
      "subTotal": 14.4,
      "quantity": 1,
      "shipping": 5
    },
    reducers: {
      add (state, newItem) {
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
    models: {
      customer: Form.model<CustomerFields>({
        constraints () {
          return {
            name: {presence: true},
            email: {presence: true, email: true},
          }
        },
        defaultForm () {
          return {
            name: '',
            email: '',
          }
        },
      })
    }
  }
}

function total (items: CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + (curr.price.data.raw.with_tax * curr.quantity)
  }, 0)
}

function quantity (items: CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + curr.quantity
  }, 0)
}
