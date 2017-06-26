import * as desanitize from './desanitize'
import axios from 'axios'

function cleanObj<O>(obj: O): Partial<O> {
  return Object.keys(obj)
    .reduce((prev, key) => {
      if (obj[key] !== undefined && obj[key] !== null) {
        return {
          ...prev,
          [key]: obj[key],
        }
      } else {
        return prev
      }
    }, {})
}

export interface Shop {
  authentication: {
    guest: () => Promise<any>
  },
  products: {
    getAll: () => Promise<Core.Product[]>,
    get: (productId: string) => Promise<Core.Product>,
  },
  cart: {
    get: () => Promise<Core.Cart>,
    insert: (id: string, quantity: number) => Promise<Core.Cart>,
    remove: (id: string) => Promise<Core.Cart>,
    update: (id: string, quantity: number) => Promise<Core.Cart>,
    checkout: (details: Core.CheckoutFields) => Promise<any>,
    pay: (details: Core.PaymentFields, items: Core.CartEntry[]) => Promise<Core.Order>,
  },
  getShippingMethods: () => Promise<Core.ShippingMethod[]>,
  orders: {
    getAll: () => Promise<Core.Order[]>,
    get: (orderId: string) => Promise<Core.Order>,
  }
}

const API_ROOT = 'https://api.molt.in/v1'

export default function (api: any): Shop {
  return {
    authentication: {
      guest() {
        return axios.post(`${API_ROOT}/oauth/access_token`)
          .then(console.log)
      },
    },
    products: {
      getAll() {
        return axios.get(`${API_ROOT}/products`, {
          headers: {
            'Authorization': 'Bearer 5ca59bccd9e81440db789495487c5918e1bba2be'
          },
        })
          .then((p) => {
            return p.data.result.map(desanitize.product)
          })
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
          const billingAddress = cleanObj({
            first_name: details.billing.firstName,
            last_name: details.billing.lastName,
            address_1: details.billing.line1,
            address_2: details.billing.line2,
            city: details.billing.city,
            county: details.billing.county,
            country: details.billing.country,
            postcode: details.billing.postcode,
            phone: details.billing.phone,
          })
          const shippingAddress = cleanObj({
            first_name: details.shipping.firstName,
            last_name: details.shipping.lastName,
            address_1: details.shipping.line1,
            address_2: details.shipping.line2,
            city: details.shipping.city,
            county: details.shipping.county,
            country: details.shipping.country,
            postcode: details.shipping.postcode,
            phone: details.shipping.phone,
          })
          api.Cart.Complete({
            customer: cleanObj({
              first_name: details.customer.firstName,
              last_name: details.customer.lastName,
              email: details.customer.email,
            }),
            shipping: details.shippingMethod,
            gateway: 'stripe',
            ship_to: shippingAddress,
            bill_to: details.useShippingAddress
              ? shippingAddress
              : billingAddress,
          }, resolve, reject)
        })
      },
      pay(details, items) {
        return new Promise((resolve, reject) => {
          api.Checkout.Payment('purchase', details.orderId, {
            data: cleanObj({
              first_name: details.firstName,
              last_name: details.lastName,
              number: details.cardNumber,
              expiry_month: details.expiryMonth,
              expiry_year: details.expiryYear,
              cvv: details.cvv,
            }),
          }, resolve, reject)
        })
          .then((resp: any) => {
            return {
              ...desanitize.order(resp),
              items,
            }
          })
      },
    },
    getShippingMethods() {
      return new Promise((resolve, reject) => {
        api.Cart.Checkout(resolve, reject)
      })
        .then(desanitize.shippingMethods)
    },
    orders: {
      getAll() {
        return new Promise((resolve, reject) => {
          api.Orders.Find('linit=100', resolve, reject)
        })
      },
      get(orderId) {
        return new Promise((resolve, reject) => {
          api.Order.Get(orderId, resolve, reject)
        })
      },
    },
  }
}
