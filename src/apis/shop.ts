import * as desanitize from './desanitize'

export interface Shop {
  products: {
    getAll: () => Promise<Core.Product[]>,
    get: (productId: string) => Promise<Core.Product>,
  },
  cart: {
    get: () => Promise<Core.Cart>,
    insert: (id: string, quantity: number) => Promise<Core.Cart>,
    remove: (id: string) => Promise<Core.Cart>,
    update: (id: string, quantity: number) => Promise<Core.Cart>,
    checkout: (details: Core.CheckoutDetails) => Promise<any>,
    pay: (details: Core.PaymentDetails) => Promise<any>,
  },
  getShippingMethods: () => Promise<Core.ShippingMethod[]>
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
      get() {
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
      checkout(details) {
        return new Promise((resolve, reject) => {
          const billingAddress = {
            first_name: details.billing.firstName,
            last_name: details.billing.lastName,
            address_1: details.billing.line1,
            city: details.billing.city,
            county: details.billing.county,
            country: details.billing.country,
            postcode: details.billing.postcode,
            phone: details.billing.phone,
          }
          api.Cart.Complete({
            customer: {
              first_name: details.customer.firstName,
              last_name: details.customer.lastName,
              email: details.customer.email,
            },
            shipping: details.shippingMethod,
            gateway: 'stripe',
            bill_to: billingAddress,
            ship_to: details.shipToBillingAddress
              ? billingAddress
              : {
                first_name: details.shipping.firstName,
                last_name: details.shipping.lastName,
                address_1: details.shipping.line1,
                city: details.shipping.city,
                county: details.shipping.county,
                country: details.shipping.country,
                postcode: details.shipping.postcode,
                phone: details.shipping.phone,
              },
          }, resolve, reject)
        })
      },
      pay(details) {
        return new Promise((resolve, reject) => {
          api.Checkout.Payment('purchase', details.orderId, {
            data: {
              first_name: details.firstName,
              last_name: details.lastName,
              number: details.cardNumber,
              expiry_month: details.expiryMonth,
              expiry_year: details.expiryYear,
              cvv: details.cvv,
            },
          }, resolve, reject)
        })
      },
    },
    getShippingMethods() {
      return new Promise((resolve, reject) => {
        api.Cart.Checkout(resolve, reject)
      })
        .then(desanitize.shippingMethods)
    },
  }
}
