import { Models } from './'

export interface State {
  people: Core.Person[]
}

export interface Reducers { }

export interface Effects { }

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'contact'
export interface Namespace { 'contact': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model(): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      people: [
        {
          name: 'Dom',
          description: '',
          avatar: '/assets/images/people/dom.jpg',
        },
        {
          name: 'Andrea',
          description: '',
          avatar: '/assets/images/people/andrea.jpg',
        },
        {
          name: 'Nicola',
          description: '',
          avatar: '/assets/images/people/nicola.jpg',
        },
        {
          name: 'Asia',
          description: '',
          avatar: '/assets/images/people/asia.jpg',
        },
      ],
    },
    reducers: {},
    effects: {},
  }
}
