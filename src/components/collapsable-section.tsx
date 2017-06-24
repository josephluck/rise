import h from 'helix-react/lib/html'
import component, { StatefulComponent } from './stateful-component'
import * as Collapse from 'react-collapse'
import Icon from './icon'

interface Props {
  label: string
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
          className='fc-grey-700 fs-tiny tt-uppercase pos-relative d-flex align-items-center'
          onClick={actions.toggleShowing}
        >
          <Icon
            icon='arrow-right'
            className='transition d-ib'
            style={{
              top: -10,
              left: -10,
              height: 20,
              width: 20,
              transform: state.showing ? 'rotate(90deg)' : 'rotate(0deg)',
              fill: '#999999',
            }}
          />
          <span className='pos-relative fs-medium bg-white pl-1'>{props.label}</span>
        </div>
        <Collapse hasNestedCollapse isOpened={state.showing}>
          <div className='pt-2 fs-small lh-5 fc-grey-900'>
            {props.children}
          </div>
        </Collapse>
      </div>
    )
  },
})
