import h from 'helix-react/lib/html'
import component, { StatefulComponent } from './stateful-component'
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
      <div className='pos-relative'>
        <div
          className={`
            pos-fixed post-0 posr-0 w-100 h-100 bg-black transition z-1
            ${state.showing ? 'o-10' : 'o-0'}
          `}
          style={{
            pointerEvents: state.showing ? 'auto' : 'none',
          }}
          onClick={actions.toggleShowing}
        />
        <div
          className={`
            z-2 pos-fixed post-0 posr-0 h-100 w-33-l w-66 mw-11 bg-white transition pa-5
          `}
          style={{
            transform: `translateX(${state.showing ? '0%' : '100%'})`,
          }}
        >
          <div className='pt-6 fs-heading'>
            <a href='/about' className='d-b mb-4'>
              About
            </a>
            <a href='/shop' className='d-b mb-4'>
              Shop
            </a>
          </div>
        </div>
        <div
          onClick={actions.toggleShowing}
          className='pos-relative z-3'
        >
          <Icon icon={state.showing ? 'cancel' : 'menu'} />
        </div>
      </div>
    )
  },
})
