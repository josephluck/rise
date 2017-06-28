import h from 'helix-react/lib/html'
import helix from 'helix-react'
import log from 'helix-react/lib/log'

const mount = document.createElement('div')
document.body.appendChild(mount)

export default function render() {
  return helix({
    model: {
      state: {
        requests: new Set<string>(),
      },
      reducers: {
        setLoading(state, key) {
          return { requests: state.requests.add(key) }
        },
        unsetLoading(state, key) {
          const requests = new Set(state.requests)
          requests.delete(key)
          return { requests }
        },
      },
      effects: {},
    },
    component: (state, prev, actions) => {
      return (
        <div
          className={`
            loading-container transition
            ${state.requests.size ? 'visible' : ''}
          `}
        >
          <div className='loading transition' />
        </div>
      )
    },
    mount,
    plugins: [log],
  })
}
