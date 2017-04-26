import h from 'helix-react/lib/html'
import component, {StatefulComponent} from './stateful-component'
import * as Collapse from 'react-collapse'

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
interface Effects {}
// type Send = StatefulComponent.Actions<Reducers, Effects>

export default component<Props, State, Reducers, Effects>({
  state: {
    showing: false,
  },
  reducers: {
    toggleShowing (state, props) {
      return {showing: !state.showing}
    },
  },
  onEnter (_refs, _state, props, actions) {
    if (props.defaultOpen) {
      actions.toggleShowing()
    }
  },
  render (state, props, actions) {
    return (
      <div>
        <div
          className='fc-grey-700 fs-tiny tt-uppercase pos-relative d-flex'
          onClick={actions.toggleShowing}
        >
          <span
            className='pos-absolute posl-0 bb bc-grey-100'
            style={{
              left: 0,
              right: 20,
              top: '50%',
              marginTop: '-1px',
            }}
          />
          <span className='pos-relative fs-medium bg-white pr-2'>{props.label}</span>
          <span className='flex-1' />
          <div
            className='bra-pill ba bc-grey-100 bg-white pos-absolute'
            style={{
              top: '50%',
              right: 0,
              width: 20,
              height: 20,
              transform: 'translateY(-10px)',
            }}
          >
            <span
              className='ss-navigateright fc-grey-300 transition pos-absolute d-ib'
              style={{
                top: state.showing ? 5 : 5,
                left: state.showing ? 3 : 5,
                height: 10,
                width: 10,
                fontSize: 10,
                transform: state.showing ? 'rotate(90deg)' : 'rotate(0deg)',
              }}
            />
          </div>
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
