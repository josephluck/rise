import { Apis } from '../bootstrap'
import { Models } from './'
import * as Form from './form'

export interface LocalState {
  submitted: boolean
  sectionShowing: number
  shippingMethods: Core.ShippingMethod[]
}

export interface Reducers {
  setKey: Helix.Reducer<Models, State, Record<string, any>>
  setShippingMethods: Helix.Reducer<Models, State, Core.ShippingMethod[]>
}

export interface Effects {
  getShippingMethods: Helix.Effect0<Models>
  validateSections: Helix.Effect0<Models>
  submit: Helix.Effect0<Models>
}

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface CustomerFields {
  firstName: string
  lastName: string
  email: string
}

export interface PaymentFields {
  gateway: string
  method: string
  number: string
  month: string
  year: string
  verification: string
}

export interface ControlsFields {
  billingIsSameAsShipping: boolean
}

export interface State extends LocalState {
  customer: Form.State<CustomerFields>
  billing: Form.State<Core.BillingDetails>
  shipping: Form.State<Core.Shipping>
  payment: Form.State<PaymentFields>
  controls: Form.State<ControlsFields>
}

export interface Actions extends LocalActions {
  customer: Form.Actions<CustomerFields>
  billing: Form.Actions<Core.BillingDetails>
  shipping: Form.Actions<Core.Shipping>
  payment: Form.Actions<PaymentFields>
  controls: Form.Actions<ControlsFields>
}

export const namespace: keyof Namespace = 'checkout'
export interface Namespace { 'checkout': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model({
  shop,
}: Apis): Helix.ModelImpl<Models, LocalState, Reducers, Effects> {
  return {
    state: {
      submitted: false,
      sectionShowing: 0,
      shippingMethods: [],
    },
    reducers: {
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
        actions.checkout.payment.setValidity()
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
          actions.checkout.payment.validateOnSubmit(),
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
              shippingMethod: '123325434',
              gateway: 'stripe',
              billing: {
                firstName: customer.firstName,
                lastName: customer.lastName,
                line1: billing.line1,
                country: billing.country,
                postcode: billing.postcode,
              },
              shipToBillingAddress: true,
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
          .then(() => {
            console.log('All done')
            return state
          })
          .catch(() => {
            console.log(state)
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
      customer: Form.model<CustomerFields>({
        constraints: () => ({
          firstName: { presence: true },
          lastName: { presence: true },
          email: { presence: true, email: true },
        }),
        defaultForm: () => ({
          firstName: '',
          lastName: '',
          email: '',
        }),
      }),
      billing: Form.model<Core.BillingDetails>({
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
        defaultForm: () => {
          return {
            firstName: '',
            lastName: '',
            line1: '',
            line2: '',
            city: '',
            county: '',
            country: 'GB',
            postcode: '',
            phone: '',
            cardNumber: '',
            expiryMonth: '',
            expiryYear: '',
            cvv: '',
          }
        },
      }),
      shipping: Form.model<Core.Shipping>({
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
        defaultForm: () => {
          return {
            firstName: '',
            lastName: '',
            line1: '',
            line2: '',
            city: '',
            county: '',
            country: '',
            postcode: '',
            phone: '',
            shippingMethod: '',
          }
        },
      }),
      payment: Form.model<PaymentFields>({
        constraints: () => ({
          gateway: { presence: true },
          method: { presence: true },
          number: { presence: true },
          month: { presence: true },
          year: { presence: true },
          verification: { presence: true },
        }),
        defaultForm: () => ({
          gateway: 'stripe',
          method: 'purchace',
          number: '',
          month: '',
          year: '',
          verification: '',
        }),
      }),
    },
  }
}
