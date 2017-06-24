import { Apis } from '../bootstrap'
import { Models } from './'

export type Product = any

export interface State {
  products: Product[]
  product: Product | null
}

export interface Reducers {
  setProducts: Helix.Reducer<Models, State, Product[]>
  setProduct: Helix.Reducer<Models, State, Product>
}

export interface Effects {
  fetchAll: Helix.Effect0<Models>
  fetch: Helix.Effect<Models, string>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'products'
export interface Namespace { 'products': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function emptyState() {
  return {
    products: [],
    product: null,
  }
}

export function model({
  shop,
}: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: emptyState(),
    reducers: {
      setProducts(state, products) {
        return {
          products,
        }
      },
      setProduct(state, product) {
        return { product }
      },
    },
    effects: {
      fetchAll(state, actions) {
        return new Promise(resolve => {
          shop.Product.Find('limit=20', resolve)
        })
          .then(actions[namespace].setProducts)
      },
      fetch(state, actions, productId) {
        return new Promise(resolve => {
          shop.Product.Get(productId, resolve)
        })
          .then(actions[namespace].setProduct)
      },
    },
  }
}
