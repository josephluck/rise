import h from 'helix-react/lib/html'
import { Models } from '../model'

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetchAll()
  },
  view(state, prev, actions) {
    return (
      <div>
        <div className='bg-black h-100vh w-100vw'>
        </div>
      </div>
    )
  },
}

export default page
