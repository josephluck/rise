import h from 'helix-react/lib/html'
import Button from '../components/button'


const page = {
  view (state, prev, actions) {
    return (
      <div>
        <div className='w-100 h-10 bg-grey-100'></div>
        <div className='pv-6'>
          <div className='ta-c ph-4 mb-9'>
            <div className='fs-heading mb-5 fw-500'>Baking Lives Better</div>
            <div className='lh-5 mb-5'>Lorem ipsum dolor sit amet</div>
            <Button
              label='Shop Now'
              href='/shop'
            />
          </div>
          <div className='ta-c ph-4 mb-9'>
            <div className='fs-heading mb-5 fw-500'>Feel Good Food</div>
            <div className='lh-5 mb-5'>
              We are based just off Brick Lane. We honed our trade selling cakes to local businesses. And after a couple of years our cakes were going down so well locally, we decided to start selling our amazingly delicious brownies online too.
            </div>
            <Button
              label='Our Story'
              href='/about'
            />
          </div>
        </div>
      </div>
    )
  },
}

export default page
