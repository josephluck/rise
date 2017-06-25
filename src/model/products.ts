import { Apis } from '../bootstrap'
import { Models } from './'

export interface State {
  products: Core.Product[]
  product: Core.Product | null
}

export interface Reducers {
  reset: Helix.Reducer0<Models, State>
  setProducts: Helix.Reducer<Models, State, Core.Product[]>
  setProduct: Helix.Reducer<Models, State, Core.Product>
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
      reset: emptyState,
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
        return shop.products.getAll()
          .then(actions[namespace].setProducts)
      },
      fetch(state, actions, productId) {
        return shop.products.get(productId)
          .then(actions[namespace].setProduct)
      },
    },
  }
}
