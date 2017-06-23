/* tslint:disable */

import { Models } from './'
import * as Form from './form'

export interface LocalState { }

export interface Reducers { }

export interface Effects { }

export type LocalActions = Helix.Actions<Reducers, Effects>

export interface CustomerFields {
  name: string
  email: string
}

export interface AddressFields {
  first_name: string
  last_name: string
  line_1: string
  line_2: string
  postcode: string
  county: string
}

export interface ShippingAddressFields extends AddressFields {
  instructions: string
}

export interface PaymentFields {
  gateway: string
  method: string
  first_name: string
  last_name: string
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
    first_name: { presence: true },
    last_name: { presence: true },
    line_1: { presence: true },
    line_2: { presence: true },
    postcode: { presence: true },
    county: { presence: true },
  }
}

function baseAddressDefaultForm(): AddressFields {
  return {
    first_name: '',
    last_name: '',
    line_1: '',
    line_2: '',
    postcode: '',
    county: '',
  }
}

export function model(): Helix.ModelImpl<Models, LocalState, Reducers, Effects> {
  return {
    state: {},
    reducers: {},
    effects: {},
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
          name: { presence: true },
          email: { presence: true, email: true },
        }),
        defaultForm: () => ({
          name: '',
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
          first_name: { presence: true },
          last_name: { presence: true },
          number: { presence: true },
          month: { presence: true },
          year: { presence: true },
          verification: { presence: true },
        }),
        defaultForm: () => ({
          gateway: 'stripe',
          method: 'purchace',
          first_name: '',
          last_name: '',
          number: '',
          month: '',
          year: '',
          verification: '',
        })
      })
    }
  }
}
