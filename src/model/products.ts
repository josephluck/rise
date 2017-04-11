import {Apis} from '../bootstrap'
import {Models} from './'

interface Image {
  url: {
    http: string,
  }
}

export interface Product {
  id: number,
  title: string
  price: {
    value: string,
    data: {
      raw: {
        with_tax: number,
      },
    },
  }
  images: Image[]
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

export function model ({
  shop,
}: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      items: [],
    },
    reducers: {
      set (state, items) {
        return {items}
      },
    },
    effects: {
      fetch (state, actions) {
        return new Promise(resolve => {
          shop.Product.Find('limit=20', resolve)
        })
        .then(actions[namespace].set)
      },
    },
  }
}
