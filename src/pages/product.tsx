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
  onLeave(state, _prev, actions) {
    actions.products.reset()
  },
  view(state, prev, actions) {
    const product = state.products.product
    if (product) {
      return (
        <div className='pb-5 ph-3'>
          {product.images.length > 1
            ? (
              <div className='mb-3'>
                <Carousel
                  key='product-images-carousel'
                  autoPlay
                  items={product.images}
                  item={image => {
                    return (
                      <div
                        className='h-11 d-flex flex-direction-column pa-3'
                        style={{
                          backgroundImage: `url(${image})`,
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
                  src={product.images[0]}
                  className='w-100 h-auto mb-3'
                />
              )
              : null
          }
          <div className='d-flex mb-5 fs-medium'>
            <div className='flex-1 mr-2 fw-500'>{product.title}</div>
            <div>
              {'£'}<Currency price={product.price} />
            </div>
          </div>
          <div className='mb-5'>
            <CollapsableSection
              label='Description'
              defaultOpen={true}
            >
              <div className='fs-small lh-5 fc-grey-900'>
                {product.description}
              </div>
            </CollapsableSection>
          </div>
          <div className='mb-5'>
            <CollapsableSection
              label='Ingredients'
              defaultOpen={true}
            >
              <div className='fs-small lh-5 fc-grey-900'>
                {'Dark Chocolate (Cocoa Mass, Cocoa Butter, Emulsifiers (Soya Lecithin), Polyglycerol Polyricinoleate, Salt, Flavouring (Vanilla Essence), Butter (Unsalted Butter [Cows Milk]. Minimum 80% Milk Fat), Sugar, Flour (Wheat Flour, Calcium Carbonate, Iron, Niacin, Thiamin), Eggs, Vanilla Extract (Water, Ethanol; Vanilla Extract [3%]).'}
              </div>
            </CollapsableSection>
          </div>
          <div className='d-flex'>
            <div className='flex-1' />
            <Controls
              onAddToCart={quantity => {
                actions.cart.add({
                  ...product,
                  quantity,
                })
              }}
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
  sidebar(state, prev, actions) {
    const product = state.products.product
    if (product) {
      return (
        <div className='bg-grey-50'>
          {product.title}
        </div>
      )
    } else {
      return null
    }
  },
}

export default page
