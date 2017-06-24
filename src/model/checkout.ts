import { Apis } from '../bootstrap'
import { Models } from './'
import * as Form from './form'

export interface LocalState {
  submitted: boolean
  sectionShowing: number
}

export interface Reducers {
  setKey: Helix.Reducer<Models, State, Record<string, any>>
}

export interface Effects {
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
  shippingIsSameAsBilling: boolean
}

export interface State extends LocalState {
  customer: Form.State<CustomerFields>
  billing: Form.State<Core.Address>
  shipping: Form.State<Core.Address>
  payment: Form.State<PaymentFields>
  controls: Form.State<ControlsFields>
}

export interface Actions extends LocalActions {
  customer: Form.Actions<CustomerFields>
  billing: Form.Actions<Core.Address>
  shipping: Form.Actions<Core.Address>
  payment: Form.Actions<PaymentFields>
  controls: Form.Actions<ControlsFields>
}

export const namespace: keyof Namespace = 'checkout'
export interface Namespace { 'checkout': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function baseAddressConstraints(): Record<keyof Core.Address, any> {
  return {
    firstName: { presence: true },
    lastName: { presence: true },
    line1: { presence: true },
    city: undefined,
    county: undefined,
    country: { presence: true },
    postcode: { presence: true },
    phone: undefined,
  }
}

function baseAddressDefaultForm(): Core.Address {
  return {
    firstName: '',
    lastName: '',
    line1: '',
    city: '',
    county: '',
    country: '',
    postcode: '',
    phone: '',
  }
}

export function model({
  shop,
}: Apis): Helix.ModelImpl<Models, LocalState, Reducers, Effects> {
  return {
    state: {
      submitted: false,
      sectionShowing: 0,
    },
    reducers: {
      setKey(state, payload) {
        return {
          ...state,
          ...payload,
        }
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
          .catch(() => {
            console.log(state)
          })
      },
    },
    models: {
      controls: Form.model<ControlsFields>({
        constraints: () => ({
          shippingIsSameAsBilling: undefined,
        }),
        defaultForm: () => ({
          shippingIsSameAsBilling: true,
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
      billing: Form.model<Core.Address>({
        constraints: baseAddressConstraints,
        defaultForm: baseAddressDefaultForm,
      }),
      shipping: Form.model<Core.Address>({
        constraints: baseAddressConstraints,
        defaultForm: baseAddressDefaultForm,
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
