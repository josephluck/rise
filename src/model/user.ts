import { Apis } from '../bootstrap'
import { Models } from './'

export interface State {
  user: null | any
  token: string
}

export interface Reducers {
  storeToken: Helix.Reducer<Models, State, any>
}

export interface Effects {
  authenticate: Helix.Effect0<Models>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'user'
export interface Namespace { 'user': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

const token = window.localStorage.getItem('moltin-token')

export function model({
  shop,
}: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      user: null,
      token: `Bearer ${token}` || '',
    },
    reducers: {
      storeToken: (state, token) => ({ token }),
    },
    effects: {
      authenticate(state, actions) {
        return shop.authentication.guest()
          .then(actions.user.storeToken)
          .then(() => state)
      },
    },
  }
}
