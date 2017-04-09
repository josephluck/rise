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
    name: 'White chocolate and raspberry brownie',
    price: 16,
    description: 'One of our favourites, this bad boy is made with heaps of raspberries and dark and white chocolate, Fudgy on the inside, crisp on the outside, just as a brownie should be.',
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
