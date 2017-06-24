import * as desanitize from './desanitize'

export interface Shop {
  products: {
    getAll: () => Promise<Core.Product[]>,
    get: (productId: string) => Promise<Core.Product>,
  },
  cart: {
    checkout: () => Promise<Core.Cart>,
    insert: (id: string, quantity: number) => Promise<Core.Cart>,
    remove: (id: string) => Promise<Core.Cart>,
    update: (id: string, quantity: number) => Promise<Core.Cart>,
  },
}

export default function (api: any): Shop {
  return {
    products: {
      getAll() {
        return new Promise((resolve, reject) => {
          api.Product.Find('limit=100', resolve, reject)
        })
          .then((p: any[]) => p.map(desanitize.product))
      },
      get(productId) {
        return new Promise((resolve, reject) => {
          api.Product.Get(productId, resolve, reject)
        })
          .then(desanitize.product)
      },
    },
    cart: {
      checkout() {
        return new Promise((resolve, reject) => {
          api.Cart.Checkout(resolve, reject)
        })
          .then(desanitize.cart)
      },
      insert(id, quantity) {
        return new Promise((resolve, reject) => {
          api.Cart.Insert(id, quantity, null, resolve, reject)
        })
      },
      remove(id) {
        return new Promise((resolve, reject) => {
          api.Cart.Remove(id, resolve, reject)
        })
      },
      update(id, quantity) {
        return new Promise((resolve, reject) => {
          api.Cart.Update(id, { quantity }, resolve, reject)
        })
      },
    },
  }
}
