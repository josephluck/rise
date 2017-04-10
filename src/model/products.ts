import {Apis} from '../bootstrap'
import {Models} from './'

export interface Product {
  id: number,
  name: string
  price: number
  description: string
}

export interface State {
  items: Product[]
}

export interface Reducers {
  set: Helix.Reducer<Models, State, any[]>
}

export interface Effects {
  fetch: Helix.Effect0<Models>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'products'
export interface Namespace { 'products': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function product (): Product {
  return {
    id: Math.random(),
    name: 'White chocolate and raspberry brownie',
    price: 16,
    description: 'One of our favourites, this bad boy is made with heaps of raspberries and dark and white chocolate, Fudgy on the inside, crisp on the outside, just as a brownie should be.',
  }
}

export function model ({
  shop,
}: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      items: [
        product(),
        product(),
        product(),
        product(),
      ],
    },
    reducers: {
      set (state, items) {
        return {items}
      },
    },
    effects: {
      fetch (state, actions) {
        return new Promise(resolve => {
          shop.product.Find('limit=20', resolve)
        })
        .then(actions[namespace].set)
      },
    },
  }
}
