import h from 'helix-react/lib/html'
import component, { StatefulComponent } from './stateful-component'
import Icon from './icon'

interface Props {
  children?: any
  defaultOpen?: boolean
  className?: string
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
      <div className={`pos-relative ${props.className || ''}`}>
        <div
          className={`
            pos-fixed post-0 posr-0 w-100 h-100 bg-white transition z-1
            ${state.showing ? 'o-90' : 'o-0'}
          `}
          style={{
            pointerEvents: state.showing ? 'auto' : 'none',
          }}
          onClick={actions.toggleShowing}
        />
        <div
          className={`
            z-2 pos-fixed post-0 posr-0 h-100 w-33-l w-66 mw-11 bg-white transition pa-5 ta-c bl bc-grey-200
          `}
          style={{
            transform: `translateX(${state.showing ? '0%' : '100%'})`,
          }}
        >
          <div className='pt-6 fs-heading'>
            <a
              href='/about'
              className='d-b mb-4'
              onClick={actions.toggleShowing}
            >
              About
            </a>
            <a
              href='/shop'
              className='d-b mb-4'
              onClick={actions.toggleShowing}
            >
              Shop
            </a>
            <a
              href='/blog'
              className='d-b mb-4'
              onClick={actions.toggleShowing}
            >
              Blog
            </a>
            <a
              href='/contact'
              className='d-b mb-4'
              onClick={actions.toggleShowing}
            >
              Contact
            </a>
          </div>
        </div>
        <div
          onClick={actions.toggleShowing}
          className='pos-relative z-3'
        >
          <Icon
            icon={state.showing ? 'plus' : 'menu'}
            className='transition pos-relative'
            style={{
              transform: state.showing ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          />
        </div>
      </div>
    )
  },
})
