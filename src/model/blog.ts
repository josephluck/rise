import {Models} from './'

export interface Post {
  id: number,
  title: string
  description: string
  by: string
}

export interface State {
  items: Post[]
}

export interface Reducers {}

export interface Effects {}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'blog'
export interface Namespace { 'blog': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function post (): Post {
  return {
    id: Math.random(),
    title: 'Lorem Ipsum Dolor',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer imperdiet placerat sapien, sit amet tincidunt nibh pellentesque quis. Mauris eget est et sem hendrerit vehicula non at tortor.',
    by: 'Joseph Luck',
  }
}

export function model (): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      items: [
        post(),
        post(),
        post(),
        post(),
      ],
    },
    reducers: {},
    effects: {},
  }
}
