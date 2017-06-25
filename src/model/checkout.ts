import { Apis } from '../bootstrap'
import { Models } from './'
import * as Form from './form'
import * as fixtures from '../utils/fixtures'

export interface LocalState {
  submitted: boolean
  sectionShowing: number
  shippingMethods: Core.ShippingMethod[]
  totals: Core.Totals
}

export interface Reducers {
  calculateTotals: Helix.Reducer<Models, State, Core.Cart>
  setKey: Helix.Reducer<Models, State, Record<string, any>>
  setShippingMethods: Helix.Reducer<Models, State, Core.ShippingMethod[]>
}

export interface Effects {
  getShippingMethods: Helix.Effect0<Models>
  validateSections: Helix.Effect0<Models>
  submit: Helix.Effect0<Models>
}

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface ControlsFields {
  billingIsSameAsShipping: boolean
}

export interface State extends LocalState {
  customer: Form.State<Core.CustomerFields>
  billing: Form.State<Core.BillingFields>
  shipping: Form.State<Core.ShippingFields>
  controls: Form.State<ControlsFields>
}

export interface Actions extends LocalActions {
  customer: Form.Actions<Core.CustomerFields>
  billing: Form.Actions<Core.BillingFields>
  shipping: Form.Actions<Core.ShippingFields>
  controls: Form.Actions<ControlsFields>
}

export const namespace: keyof Namespace = 'checkout'
export interface Namespace { 'checkout': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function defaultState(): LocalState {
  return {
    submitted: false,
    sectionShowing: 1,
    shippingMethods: [],
    totals: {
      subTotal: 0,
      total: 0,
      quantity: 0,
      shipping: 0,
    },
  }
}

export function model({
  shop,
}: Apis): Helix.ModelImpl<Models, LocalState, Reducers, Effects> {
  return {
    state: defaultState(),
    reducers: {
      calculateTotals(state, cart) {
        const subTotal = total(cart.items)
        const shippingMethod = state.shippingMethods.find(method => method.id === state.shipping.fields.shippingMethod)
        const shipping = state.shipping.fields.shippingMethod && shippingMethod
          ? shippingMethod.price
          : 0

        return {
          totals: {
            subTotal,
            total: subTotal + shipping,
            quantity: quantity(cart.items),
            shipping,
          },
        }
      },
      setKey(state, payload) {
        return {
          ...state,
          ...payload,
        }
      },
      setShippingMethods(state, shippingMethods) {
        return { shippingMethods }
      },
    },
    effects: {
      validateSections(state, actions) {
        actions.checkout.customer.setValidity()
        actions.checkout.billing.setValidity()
        actions.checkout.shipping.setValidity()
        return Promise.resolve(state)
      },
      getShippingMethods(state, actions) {
        return shop.getShippingMethods()
          .then(actions.checkout.setShippingMethods)
      },
      submit(state, actions) {
        actions.checkout.setKey({
          submitted: true,
        })
        const validations = [
          actions.checkout.customer.validateOnSubmit(),
          actions.checkout.billing.validateOnSubmit(),
          actions.checkout.shipping.validateOnSubmit(),
        ] as any[]
        return Promise.all(validations)
          .then(() => {
            const customer = state.checkout.customer.fields
            const billing = state.checkout.billing.fields
            const shipping = state.checkout.shipping.fields
            return shop.cart.checkout({
              customer: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                email: customer.email,
              },
              shippingMethod: shipping.shippingMethod,
              gateway: 'stripe',
              billing: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                line1: billing.line1,
                country: billing.country,
                postcode: billing.postcode,
              },
              useShippingAddress: true,
              shipping: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                line1: shipping.line1,
                country: shipping.country,
                postcode: shipping.postcode,
              },
            })
          })
          .then(order => {
            const billing = state.checkout.billing.fields
            return shop.cart.pay({
              orderId: order.id,
              firstName: billing.firstName,
              lastName: billing.lastName,
              cardNumber: billing.cardNumber,
              expiryMonth: billing.expiryMonth,
              expiryYear: billing.expiryYear,
              cvv: billing.cvv,
            })
          })
          .then(order => {
            actions.orders.setOrder(order)
            const newState = actions.location.set('/checkout/complete')
            return newState
          })
          .catch(err => {
            console.info('Handle error')
            console.error(err)
          })
      },
    },
    models: {
      controls: Form.model<ControlsFields>({
        constraints: () => ({
          billingIsSameAsShipping: undefined,
        }),
        defaultForm: () => ({
          billingIsSameAsShipping: true,
        }),
      }),
      customer: Form.model<Core.CustomerFields>({
        constraints: () => ({
          firstName: { presence: true },
          lastName: { presence: true },
          email: { presence: true, email: true },
        }),
        defaultForm: fixtures.customer,
      }),
      billing: Form.model<Core.BillingFields>({
        constraints: () => {
          return {
            firstName: { presence: true },
            lastName: { presence: true },
            line1: { presence: true },
            line2: undefined,
            city: undefined,
            county: undefined,
            country: { presence: true },
            postcode: { presence: true },
            phone: undefined,
            cardNumber: { presence: true },
            expiryMonth: { presence: true },
            expiryYear: { presence: true },
            cvv: { presence: true },
          }
        },
        defaultForm: fixtures.billing,
      }),
      shipping: Form.model<Core.ShippingFields>({
        constraints: () => {
          return {
            firstName: { presence: true },
            lastName: { presence: true },
            line1: { presence: true },
            line2: undefined,
            city: undefined,
            county: undefined,
            country: { presence: true },
            postcode: { presence: true },
            phone: undefined,
            shippingMethod: { presence: true },
          }
        },
        defaultForm: fixtures.shipping,
      }),
    },
  }
}

function total(items: Core.CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + (curr.price * curr.quantity)
  }, 0)
}

function quantity(items: Core.CartEntry[]): number {
  return items.reduce((prev, curr) => {
    return prev + curr.quantity
  }, 0)
}