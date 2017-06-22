import h from 'helix-react/lib/html'
import { Models } from '../model'
import CollapsableSection from '../components/collapsable-section'
import Controls from '../components/add-product-controls'
import Currency from '../components/currency'
import Carousel from '../components/carousel'

const page: Helix.Page<Models> = {
  onEnter(state, _prev, actions) {
    actions.products.fetch(state.location.params.productId)
  },
  view(state, prev, actions) {
    const product = state.products.product
    if (product) {
      return (
        <div className='pb-5'>
          {product.images.length > 1
            ? (
              <div className='mb-2'>
                <Carousel
                  key='product-images-carousel'
                  autoPlay
                  items={product.images}
                  item={image => {
                    return (
                      <div
                        className='h-11 d-flex flex-direction-column pa-3'
                        style={{
                          backgroundImage: `url(${image.url.http})`,
                          backgroundPosition: 'center center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                        }}
                      >
                      </div>
                    )
                  }}
                />
              </div>
            )
            : product.images.length
              ? (
                <img
                  src={product.images[0].url.http}
                  className='w-100 h-auto mb-2'
                />
              )
              : null
          }
          <div className='d-flex align-items-center mb-3'>
            <div className='flex-1 mr-2 fw-500'>{product.title}</div>
            <div>
              {'£'}<Currency price={product.price.data.raw.with_tax} />
            </div>
          </div>
          <div className='mb-3'>
            <CollapsableSection
              label='Description'
              defaultOpen={true}
            >
              {product.description}
            </CollapsableSection>
          </div>
          <div className='mb-3'>
            <CollapsableSection
              label='Ingredients'
              defaultOpen={true}
            >
              <div>
                {'Dark Chocolate (Cocoa Mass, Cocoa Butter, Emulsifiers (Soya Lecithin), Polyglycerol Polyricinoleate, Salt, Flavouring (Vanilla Essence), Butter (Unsalted Butter [Cows Milk]. Minimum 80% Milk Fat), Sugar, Flour (Wheat Flour, Calcium Carbonate, Iron, Niacin, Thiamin), Eggs, Vanilla Extract (Water, Ethanol; Vanilla Extract [3%]).'}
              </div>
            </CollapsableSection>
          </div>
          <div className='d-flex'>
            <div className='flex-1' />
            <Controls
              onAddToCart={console.log}
            />
          </div>
        </div>
      )
    } else {
      return (
        <div>Loading</div>
      )
    }
  },
}

export default page
