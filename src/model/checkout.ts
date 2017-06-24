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

export interface AddressFields {
  line1: string
  line2: string
  postcode: string
  county: string
}

export interface ShippingAddressFields extends AddressFields {
  instructions: string
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
  billing: Form.State<AddressFields>
  shipping: Form.State<ShippingAddressFields>
  payment: Form.State<PaymentFields>
  controls: Form.State<ControlsFields>
}

export interface Actions extends LocalActions {
  customer: Form.Actions<CustomerFields>
  billing: Form.Actions<AddressFields>
  shipping: Form.Actions<ShippingAddressFields>
  payment: Form.Actions<PaymentFields>
  controls: Form.Actions<ControlsFields>
}

export const namespace: keyof Namespace = 'checkout'
export interface Namespace { 'checkout': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function baseAddressConstraints(): Record<keyof AddressFields, any> {
  return {
    line1: { presence: true },
    line2: { presence: true },
    postcode: { presence: true },
    county: { presence: true },
  }
}

function baseAddressDefaultForm(): AddressFields {
  return {
    line1: '',
    line2: '',
    postcode: '',
    county: '',
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
        return actions.checkout.customer.validateOnSubmit()
          .then(actions.checkout.billing.validateOnSubmit)
          .then(actions.checkout.shipping.validateOnSubmit)
          .then(actions.checkout.payment.validateOnSubmit)
          // .then(() => {
          //   return new Promise(resolve => {
          //     shop.
          //   })
          // })
          .then(() => state)
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
      billing: Form.model<AddressFields>({
        constraints: baseAddressConstraints,
        defaultForm: baseAddressDefaultForm,
      }),
      shipping: Form.model<ShippingAddressFields>({
        constraints: () => ({
          ...baseAddressConstraints(),
          instructions: undefined,
        }),
        defaultForm: () => ({
          ...baseAddressDefaultForm(),
          instructions: '',
        }),
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
