import h from 'helix-react/lib/html'
import component, {StatefulComponent} from './stateful-component'
import Stepper from './stepper'
import Button from './button'

export interface Props {
  onAddToCart: (quantity: number) => any
}
interface State {
  quantity: number | null
}
interface Reducers {
  updateQuantity: StatefulComponent.Reducer<State, Props, string>
}
interface Effects {}
// type Send = StatefulComponent.Actions<Reducers, Effects>

export default component<Props, State, Reducers, Effects>({
  state: {
    quantity: 1,
  },
  reducers: {
    updateQuantity (state, props, quantity) {
      return {quantity: parseInt(quantity, 10)}
    },
  },
  render (state, props, actions) {
    return (
      <div className='d-flex align-items-center'>
        <Stepper
          value={state.quantity.toString()}
          onChange={actions.updateQuantity}
        />
        <Button
          label='Add to Cart'
          className='ml-2 bg-transparent'
          size='small'
          onClick={() => {
            if (state.quantity) {
              props.onAddToCart(state.quantity)
              actions.updateQuantity('1')
            }
          }}
        />
      </div>
    )
  },
})
