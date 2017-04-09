import * as react from 'react'

function createReducers (reducers: any) {
  return Object.keys(reducers).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: (payload: any) => {
        const ret = reducers[curr](this.state, this.props, payload)
        this.setState(ret)
        return this.state
      },
    }
  }, {})
}

function createEffects (effects: any, reducers: any) {
  return Object.keys(effects).reduce((prev, curr) => {
    return {
      ...prev,
      [curr]: (payload: any) => {
        return effects[curr](this.state, this.props, reducers, payload)
      },
    }
  }, {})
}

export default function component<P, S, R, E> ({
  state,
  reducers = {},
  effects = {},
  onEnter,
  render,
}: {
  state: S,
  reducers?: ReducersImpl<R>
  effects?: EffectsImpl<E>
  onEnter?: (refs: {[key: string]: HTMLElement}, state: S, props: P, send: StatefulComponent.Actions<R, E>) => any
  render: (state: S, props: P, send: StatefulComponent.Actions<R, E>) => any,
}) {
  return react.createClass<P, S>({
    getInitialState: function () {
      return state
    },
    componentWillMount () {
      this.reducers = createReducers.bind(this)(reducers)
      this.effects = createEffects.bind(this)(effects, this.reducers)
    },
    componentDidMount () {
      const send = { ...this.reducers, ...this.effects }
      if (onEnter) {
        onEnter(this.refs, this.state, this.props, send)
      }
    },
    render: function () {
      const send = { ...this.reducers, ...this.effects }
      return render(this.state, this.props, send)
    },
  })
}

// Pluck out reducer & effect implementations and apis (see types for reducers and effects below)
export type ReducersImpl<R extends any> = { [P in keyof R]: R[P]['impl'] }
export type EffectsImpl<E extends any> = { [P in keyof E]: E[P]['impl'] }
export type ReducersApi<R extends any> = { [P in keyof R]: R[P]['api'] }
export type EffectsApi<E extends any> = { [P in keyof E]: E[P]['api'] }

export namespace StatefulComponent {
  export type Reducer<S, P, T> = {
    impl: (state: S, props: P, payload: T) => Partial<S>,
    api: (payload: T) => S,
  }
  export type Reducer0<S, P> = {
    impl: (state: S, props: P) => Partial<S>,
    api: () => S,
  }
  export type Effect<S, P, A, T> = {
    impl: (state: S, props: P, send: A, payload: T) => Promise<Partial<S>>,
    api: (payload: T) => Promise<S>,
  }
  export type Effect0<S, P, A> = {
    impl: (state: S, props: P, send: A) => Promise<Partial<S>>,
    api: () => Promise<S>,
  }

  // Quick way to create actions from reducers & effects
  export type Actions<R, E> = ReducersApi<R> & EffectsApi<E>
}
