import {Models} from './'

export interface Post {
  id: string,
  title: string
  description: string
  by: string
}

export interface State {
  items: Post[]
  post: Post | null
}

export interface Reducers {
  setPost: Helix.Reducer<Models, State, Post>
}

export interface Effects {
  getPost: Helix.Effect0<Models>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'blog'
export interface Namespace { 'blog': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

function post (): Post {
  return {
    id: (Math.floor(Math.random() * 5) + 1 ).toString(),
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
        post(),
      ],
      post: null,
    },
    reducers: {
      setPost (_state, post) {
        return { post }
      }
    },
    effects: {
      getPost (state, actions) {
        const post = state[namespace].items.find(p => p.id === state.location.params.blogId)
        return Promise.resolve(actions[namespace].setPost(post))
      }
    },
  }
}
