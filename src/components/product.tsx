import h from 'helix-react/lib/html'
import component, {StatefulComponent} from './stateful-component'
import Stepper from './stepper'
import Button from './button'
import Currency from './currency'
import {Product} from '../model/products'
import Collapser from './collapser'

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
    quantity: 1,
  },
  reducers: {
    updateQuantity (state, props, quantity) {
      return {quantity: parseInt(quantity, 10)}
    },
  },
  render (state, props, actions) {
    return (
      <div className={`${props.className || ''}`}>
        <img
          src={props.images[0].url.http}
          className='w-100 h-auto bra-2 of-hidden d-ib mb-3'
        />
        <div className='d-flex align-items-center mb-3'>
          <div className='flex-1 mr-2 fw-500'>{props.title}</div>
          <div className='fs-large'>
            {'£'}<Currency price={props.price.data.raw.with_tax} />
          </div>
        </div>
        <div className='mb-3'>
          <Collapser
            label='Description'
            defaultOpen={true}
          >
            {props.description}
          </Collapser>
        </div>
        <div className='mb-3'>
          <Collapser
            label='Ingredients'
          >
            <div>
              {'Dark Chocolate (Cocoa Mass, Cocoa Butter, Emulsifiers (Soya Lecithin), Polyglycerol Polyricinoleate, Salt, Flavouring (Vanilla Essence), Butter (Unsalted Butter [Cows Milk]. Minimum 80% Milk Fat), Sugar, Flour (Wheat Flour, Calcium Carbonate, Iron, Niacin, Thiamin), Eggs, Vanilla Extract (Water, Ethanol; Vanilla Extract [3%]).'}
            </div>
          </Collapser>
        </div>
        <div className='d-flex align-items-center'>
          <div className='flex-1' />
          <Stepper
            value={state.quantity.toString()}
            onChange={actions.updateQuantity}
          />
          <Button
            label='Add to Cart'
            className='ml-2'
            size='small'
            onClick={() => {
              if (state.quantity) {
                actions.updateQuantity('')
                props.onAddToCart(state.quantity)
              }
            }}
          />
        </div>
      </div>
    )
  },
})
