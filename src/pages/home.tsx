import h from 'helix-react/lib/html'
import { Models } from '../model'
import Icon from '../components/icon'

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetchAll()
  },
  view(state, prev, actions) {
    return (
      <div>
        <div id='scroller' className='pos-fixed post-0 posl-0 w-100 h-100 of-auto'>
          <div
            id='section-0'
            className='h-100 pa-4 d-flex align-items-center fs-huge fw-500 lh-5'
          >
            <div>
              <p>Solving Homelessness</p>
              <p>One Brownie at a Time</p>
            </div>
          </div>
          <div
            id='section-1'
            className='h-100 pa-4 bg-grey-200'>
          </div>
          <div
            id='section-2'
            className='h-100 pa-4 bg-grey-400'>
          </div>
        </div>

        <div className='pos-fixed posr-0 post-0 pa-4 h-100 d-flex flex-direction-column'>
          <div className='flex-1'></div>
          <div onClick={actions.home.showNextSection}>
            <Icon
              icon='arrow-down'
            />
          </div>
        </div>
      </div>
    )
  },
}

export default page
