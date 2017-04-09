import h from 'helix-react/lib/html'
import Button from '../components/button'


const page = {
  view (state, prev, actions) {
    return (
      <div>
        <div className='w-100 h-10 bg-grey-100 mb-6'></div>
        <div className='ta-c'>
          <div className='fs-heading mb-3 fw-500'>Baking Lives Better</div>
          <div className='mb-4'>Lorem ipsum dolor sit amet</div>
          <Button
            label='Shop Now'
            href='/shop'
          />
        </div>
      </div>
    )
  },
}

export default page
