import h from 'helix-react/lib/html'
import {Models} from '../model'
import Button from '../components/button'
import Carousel from '../components/carousel'

const page: Helix.Page<Models> = {
  onEnter (_state, _prev, actions) {
    actions.products.fetch()
  },
  view (state, prev, actions) {
    return (
      <div>
        <Carousel
          items={state.products.items}
          item={product => {
            return (
              <div
                className='h-10 d-flex flex-direction-column pa-3'
                style={{
                  backgroundImage: `url(${product.images[0].url.http})`,
                  backgroundPosition: 'center center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className='flex-1' />
                <div className='ph-3 pv-2 ba bc-black bg-black fc-white ta-c'>
                  {product.title}
                </div>
              </div>
            )
          }}
        />
        <div className='pv-5'>
          <div className='ta-c ph-4 mb-9'>
            <div className='fs-heading mb-4 fw-500'>Honest Baking</div>
            <div className='lh-5 mb-4'>Lorem ipsum dolor sit amet</div>
            <Button
              label='Shop'
              href='/shop'
              size='large'
            />
          </div>
          <div className='ta-c ph-4 mb-9'>
            <div className='fs-heading mb-4 fw-500'>Do Good Food</div>
            <div className='lh-5 mb-4'>
              We are based just off Brick Lane. We honed our trade selling cakes to local businesses. And after a couple of years our cakes were going down so well locally, we decided to start selling our amazingly delicious brownies online too.
            </div>
            <Button
              label='Our Story'
              href='/about'
              size='large'
            />
          </div>
        </div>
      </div>
    )
  },
}

export default page
