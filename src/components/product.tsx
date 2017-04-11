import h from 'helix-react/lib/html'
import component, {StatefulComponent} from './stateful-component'
import Button from './button'
import Select from './select'
import Currency from './currency'
import {Product} from '../model/products'

export interface Props extends Product {
  className?: string
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
    quantity: null,
  },
  reducers: {
    updateQuantity (state, props, quantity) {
      return {quantity: parseInt(quantity, 10)}
    },
  },
  render (state, props, actions) {
    return (
      <div className={`${props.className}`}>
        <div className='btlr-2 btrr-2 of-hidden'>
          <img
            src={props.images[0].url.http}
            className='w-100 h-auto'
          />
        </div>
        <div className='bl bb br bc-grey-100 pa-3 bblr-2 bbrr-2 ta-c'>
          <div className='mb-4'>
            <div className='fw-500 mb-3 fs-large'>{props.title}</div>
            <div className='fc-grey-700 mb-3'>{'£'}<Currency price={props.price.data.raw.with_tax} /></div>
            <div className='lh-5'>{props.description}</div>
          </div>
          <div className='d-flex'>
            <Select
              className='flex-1 mr-2'
              placeholder='QUANTITY'
              value={state.quantity ? state.quantity.toString() : ''}
              onChange={actions.updateQuantity}
              options={[
                {label: '1', value: '1'},
                {label: '2', value: '2'},
                {label: '3', value: '3'},
                {label: '4', value: '4'},
                {label: '5', value: '5'},
                {label: '6', value: '6'},
                {label: '7', value: '7'},
                {label: '8', value: '8'},
                {label: '9', value: '9'},
                {label: '10', value: '10'},
              ]}
            />
            <Button
              label='Add to Cart'
              className='flex-1 ml-2'
              onClick={() => {
                if (state.quantity) {
                  actions.updateQuantity('')
                  props.onAddToCart(state.quantity)
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  },
})
