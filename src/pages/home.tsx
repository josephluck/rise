import h from 'helix-react/lib/html'
import { Models } from '../model'

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetchAll()
  },
  view(state, prev, actions) {
    return (
      <div>
        <div className='h-100vh w-100vw'>
          <div
            className='w-100 h-100 bg-white'
            style={{
              backgroundImage: 'url(/assets/images/home.jpg)',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
          </div>
        </div>
        <div className='h-100vh w-100vw bg-grey-100'>
          the best brownies
        </div>
      </div>
    )
  },
}

export default page
