import * as desanitize from './desanitize'
import axios from 'axios'
import * as qs from 'qs'
import cleanObj from '../utils/clean-object'

import * as Fingerprint from 'fingerprintjs2'

const API_BASE = 'https://api.molt.in'
const API_ROOT = `${API_BASE}/v1`

function getHeaders(token: string) {
  return {
    headers: {
      'Authorization': token,
    },
  }
}

const data = qs.stringify

let fingerprint = window.localStorage.getItem('moltin-fingerprint') || ''
const getFingerprint = new Fingerprint()
getFingerprint.get(resp => {
  fingerprint = resp
  window.localStorage.setItem('moltin-fingerprint', resp)
})

export default function api() {
  return {
    authentication: {
      guest(): Promise<string> {
        return axios.post(`${API_BASE}/oauth/access_token`, data({
          grant_type: 'implicit',
          client_id: 'RVrw4jYbl9XvTM4hRBbJ2cGRcRJlW7evenovhYtLde',
        }))
          .then(resp => resp.data.access_token)
      },
    },
    products: {
      getAll(token): Promise<Core.Product[]> {
        return axios.get(`${API_ROOT}/products`, getHeaders(token))
          .then(resp => {
            return resp.data.result.map(desanitize.product)
          })
      },
      get(token, productId): Promise<Core.Product> {
        return axios.get(`${API_ROOT}/products/${productId}`, getHeaders(token))
          .then(resp => desanitize.product(resp.data.result))
      },
    },
    cart: {
      get(token): Promise<Core.Cart> {
        return axios.get(`${API_ROOT}/carts/${fingerprint}/checkout`, getHeaders(token))
          .then(resp => desanitize.cart(resp.data.result))
      },
      insert(token, id, quantity): Promise<any> {
        return axios.post(`${API_ROOT}/carts/${fingerprint}`, data({
          quantity,
          id,
        }), getHeaders(token))
          .then(resp => resp.data)
      },
      remove(token, productId): Promise<any> {
        return axios.delete(`${API_ROOT}/carts/${fingerprint}/item/${productId}`, getHeaders(token))
          .then(resp => resp.data)
      },
      update(token, productId, quantity): Promise<any> {
        return axios.put(`${API_ROOT}/carts/${fingerprint}/item/${productId}`, data({
          productId,
          quantity,
        }), getHeaders(token))
          .then(resp => resp.data)
      },
      checkout(token, details): Promise<string> {
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
        return axios.post(`${API_ROOT}/carts/${fingerprint}/checkout`, data({
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
        }), getHeaders(token))
          .then(resp => resp.data.result.id)
      },
      pay(token, details, items): Promise<Core.Order> {
        const payload = data({
          data: cleanObj({
            first_name: details.firstName,
            last_name: details.lastName,
            number: details.cardNumber,
            expiry_month: details.expiryMonth,
            expiry_year: details.expiryYear,
            cvv: details.cvv,
          }),
        })
        return axios.post(`${API_ROOT}/checkout/payment/purchase/${details.orderId}`, payload, getHeaders(token))
          .then((resp) => {
            return {
              ...desanitize.order(resp.data.result),
              items,
            }
          })
      },
    },
    getShippingMethods(token): Promise<Core.ShippingMethod[]> {
      return axios.get(`${API_ROOT}/carts/${fingerprint}/checkout`, getHeaders(token))
        .then(resp => desanitize.shippingMethods(resp.data.result))
    },
    orders: {
      getAll(token) {
        return axios.get(`${API_ROOT}/orders`, getHeaders(token))
          .then(resp => resp.data)
      },
      get(token, orderId) {
        return axios.get(`${API_ROOT}/orders/${orderId}`, getHeaders(token))
          .then(resp => resp.data)
      },
    },
  }
}
