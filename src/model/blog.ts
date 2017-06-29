import { Apis } from '../bootstrap'
import { Models } from './'

export interface State {
  posts: Core.Post[]
  post: Core.Post | null
}

export interface Reducers {
  setPosts: Helix.Reducer<Models, State, Core.Post[]>
  setPost: Helix.Reducer<Models, State, Core.Post>
}

export interface Effects {
  getPosts: Helix.Effect0<Models>
  getPost: Helix.Effect<Models, string>
}

export type Actions = Helix.Actions<Reducers, Effects>

export const namespace: keyof Namespace = 'blog'
export interface Namespace { 'blog': ModelApi }

export type ModelApi = Helix.ModelApi<State, Actions>

export function model(api: Apis): Helix.ModelImpl<Models, State, Reducers, Effects> {
  return {
    state: {
      posts: [],
      post: null,
    },
    reducers: {
      setPosts(_state, posts) {
        return { posts }
      },
      setPost(_state, post) {
        return { post }
      },
    },
    effects: {
      getPosts(state, actions) {
        return api.blog.posts.all()
          .then(actions.blog.setPosts)
      },
      getPost(state, actions, postId) {
        return api.blog.posts.fetch(postId)
          .then(actions.blog.setPost)
      },
    },
  }
}
