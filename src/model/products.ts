import {Models} from './'

export interface Product {
  name: string
  price: number
  description: string
}

export interface State {
  items: Product[]
}

export interface Reducers {}

export interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'products'
export interface Namespace { 'products': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function product (): Product {
  return {
    name: 'Brownie',
    price: 16,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vehicula enim in dui imperdiet tempor. Etiam iaculis faucibus lacus id scelerisque. Phasellus elementum mi ante, id bibendum neque elementum nec.',
  }
}

export function model (): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      items: [
        product(),
        product(),
        product(),
        product(),
      ],
    },
    reducers: {},
    effects: {},
  }
}
