import h from 'helix-react/lib/html'
import Currency from './currency'
import {Product} from '../model/products'
import Collapser from './collapser'
import Controls from './add-product-controls'

export interface Props extends Product {
  className?: string
  onAddToCart: (quantity: number) => any
}

export default function ({
  images,
  className,
  description,
  price,
  title,
  onAddToCart,
}: Props) {
  return (
    <div className={`${className || ''}`}>
      <img
        src={images[0].url.http}
        className='w-100 h-auto bra-2 of-hidden d-ib mb-3'
      />
      <div className='d-flex align-items-center mb-3'>
        <div className='flex-1 mr-2 fw-500'>{title}</div>
        <div className='fs-large'>
          {'£'}<Currency price={price.data.raw.with_tax} />
        </div>
      </div>
      <div className='mb-3'>
        <Collapser
          label='Description'
          defaultOpen={true}
        >
          {description}
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
      <div className='d-flex'>
        <div className='flex-1' />
        <Controls
          onAddToCart={onAddToCart}
        />
      </div>
    </div>
  )
}
