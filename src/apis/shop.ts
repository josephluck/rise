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

const desanitizeProduct = (product: any): Core.Product => {
  return {
    price: 10,
    images: [''],
    id: '123',
    title: 'hey',
    description: 'a product',
  }
}

export default function (api: any): Shop {
  return {
    products: {
      getAll() {
        return new Promise((resolve, reject) => {
          api.Product.Find('limit=100', resolve, reject)
        })
          .then((p: any[]) => p.map(desanitizeProduct))
      },
      get(productId) {
        return new Promise((resolve, reject) => {
          api.Product.Get(productId, resolve, reject)
        })
          .then(desanitizeProduct)
      },
    },
    cart: {
      checkout() {
        return new Promise((resolve, reject) => {
          api.Cart.Checkout(resolve, reject)
        })
      },
      insert(id, quantity) {
        return new Promise((resolve, reject) => {
          api.Cart.Insert(id, quantity, resolve, reject)
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
