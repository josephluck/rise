/* tslint:disable */

import { Models } from './'
import * as Form from './form'
import { Product } from './products'

export interface CartEntry extends Product {
  quantity: number
}

interface Totals {
  subTotal: number
  quantity: number
  shipping: number
}

export interface LocalState {
  totals: Totals
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

export interface Effects { }

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface CustomerFields {
  name: string
  email: string
}

export interface AddressFields {
  first_name: string
  last_name: string
  line_1: string
  line_2: string
  postcode: string
  county: string
}

export interface ShippingAddressFields extends AddressFields {
  instructions: string
}

export interface PaymentFields {
  gateway: string
  method: string
  first_name: string
  last_name: string
  number: string
  month: string
  year: string
  verification: string
}

export interface ControlsFields {
  shippingIsSameAsBilling: boolean
}

export interface State extends LocalState {
  customer: Form.State<CustomerFields>
  billing: Form.State<AddressFields>
  shipping: Form.State<ShippingAddressFields>
  payment: Form.State<PaymentFields>
  controls: Form.State<ControlsFields>
}

export interface Actions extends LocalActions {
  customer: Form.Actions<CustomerFields>
  billing: Form.Actions<AddressFields>
  shipping: Form.Actions<ShippingAddressFields>
  payment: Form.Actions<PaymentFields>
  controls: Form.Actions<ControlsFields>
}

export const namespace: keyof Namespace = 'cart'
export interface Namespace { 'cart': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function baseAddressConstraints(): Record<keyof AddressFields, any> {
  return {
    first_name: { presence: true },
    last_name: { presence: true },
    line_1: { presence: true },
    line_2: { presence: true },
    postcode: { presence: true },
    county: { presence: true },
  }
}

function baseAddressDefaultForm(): AddressFields {
  return {
    first_name: '',
    last_name: '',
    line_1: '',
    line_2: '',
    postcode: '',
    county: '',
  }
}

export function model(): Helix.ModelImpl<Models, LocalState, Reducers, Effects> {
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
      totals: {
        "subTotal": 14.4,
        "quantity": 1,
        "shipping": 5,
      },
    },
    reducers: {
      add(state, newItem) {
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
          totals: {
            subTotal: total(items),
            shipping: state.totals.shipping,
            quantity: quantity(items),
          },
        }
      },
      remove(state, index) {
        const items = state.items.filter((_, i) => i !== index)
        return {
          items,
          subTotal: total(items),
          quantity: quantity(items),
        }
      },
      update(state, { index, item }) {
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
      controls: Form.model<ControlsFields>({
        constraints: () => ({
          shippingIsSameAsBilling: undefined,
        }),
        defaultForm: () => ({
          shippingIsSameAsBilling: true,
        }),
      }),
      customer: Form.model<CustomerFields>({
        constraints: () => ({
          name: { presence: true },
          email: { presence: true, email: true },
        }),
        defaultForm: () => ({
          name: '',
          email: '',
        }),
      }),
      billing: Form.model<AddressFields>({
        constraints: baseAddressConstraints,
        defaultForm: baseAddressDefaultForm,
      }),
      shipping: Form.model<ShippingAddressFields>({
        constraints: () => ({
          ...baseAddressConstraints(),
          instructions: undefined,
        }),
        defaultForm: () => ({
          ...baseAddressDefaultForm(),
          instructions: '',
        }),
      }),
      payment: Form.model<PaymentFields>({
        constraints: () => ({
          gateway: { presence: true },
          method: { presence: true },
          first_name: { presence: true },
          last_name: { presence: true },
          number: { presence: true },
          month: { presence: true },
          year: { presence: true },
          verification: { presence: true },
        }),
        defaultForm: () => ({
          gateway: 'stripe',
          method: 'purchace',
          first_name: '',
          last_name: '',
          number: '',
          month: '',
          year: '',
          verification: '',
        })
      })
    }
  }
}

function total(items: CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + (curr.price.data.raw.with_tax * curr.quantity)
  }, 0)
}

function quantity(items: CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + curr.quantity
  }, 0)
}
