import h from 'helix-react/lib/html'
import component, { StatefulComponent } from './stateful-component'
import * as Collapse from 'react-collapse'
import Icon from './icon'

interface Props {
  children?: any
  defaultOpen?: boolean
}
interface State {
  showing: boolean
}
interface Reducers {
  toggleShowing: StatefulComponent.Reducer0<State, Props>
}
interface Effects { }
// type Send = StatefulComponent.Actions<Reducers, Effects>

export default component<Props, State, Reducers, Effects>({
  state: {
    showing: false,
  },
  reducers: {
    toggleShowing(state, props) {
      return { showing: !state.showing }
    },
  },
  onEnter(_refs, _state, props, actions) {
    if (props.defaultOpen) {
      actions.toggleShowing()
    }
  },
  render(state, props, actions) {
    return (
      <div>
        <div
          className={`
            pos-fixed post-0 posr-0 w-100 h-100 bg-black transition
            ${state.showing ? 'o-10' : 'o-0'}
          `}
          style={{
            pointerEvents: state.showing ? 'auto' : 'none',
          }}
          onClick={actions.toggleShowing}
        />
        <div onClick={actions.toggleShowing}>
          <Icon icon={state.showing ? 'cancel' : 'menu'} />
        </div>
        <div
          className={`
            pos-fixed post-0 posr-0 h-100 w-33-l w-66 mw-11 bg-white transition pa-4
            ${state.showing ? 'o-100' : 'o-0'}
          `}
          style={{
            transform: `translateX(${state.showing ? '0%' : '-100%'})`,
          }}
        >
          My Menu
        </div>
      </div>
    )
  },
})
