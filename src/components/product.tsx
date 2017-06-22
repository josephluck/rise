import h from 'helix-react/lib/html'
import Currency from './currency'
import { Product } from '../model/products'
// import CollapsableSection from './collapsable-section'
// import Controls from './add-product-controls'

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
        className='w-100 h-auto of-hidden d-ib mb-2'
      />
      <div className='mb-1 fw-500'>
        {title}
      </div>
      <div className='fc-grey-500'>
        {'£'}<Currency price={price.data.raw.with_tax} />
      </div>
    </div>
  )
}
      /*<div className='mb-3'>
        <CollapsableSection
          label='Description'
          defaultOpen={true}
        >
          {description}
        </CollapsableSection>
      </div>
      <div className='mb-3'>
        <CollapsableSection
          label='Ingredients'
        >
          <div>
            {'Dark Chocolate (Cocoa Mass, Cocoa Butter, Emulsifiers (Soya Lecithin), Polyglycerol Polyricinoleate, Salt, Flavouring (Vanilla Essence), Butter (Unsalted Butter [Cows Milk]. Minimum 80% Milk Fat), Sugar, Flour (Wheat Flour, Calcium Carbonate, Iron, Niacin, Thiamin), Eggs, Vanilla Extract (Water, Ethanol; Vanilla Extract [3%]).'}
          </div>
        </CollapsableSection>
      </div>
      <div className='d-flex'>
        <div className='flex-1' />
        <Controls
          onAddToCart={onAddToCart}
        />
      </div>*/
