import h from 'helix-react/lib/html'
import { Models } from '../model'
import Icon from '../components/icon'
import * as Waypoint from 'react-waypoint'

interface PillProps {
  filled: boolean
  onClick: () => any
  className?: string
}

const Pill = ({
  filled,
  onClick,
  className = '',
}: PillProps) => {
  return (
    <div
      className={`
        d-ib bra-pill ba bw-medium bc-black transition
        ${className}
        ${filled ? 'bg-black' : 'bg-white'}
      `}
      style={{
        width: '12px',
        height: '12px',
      }}
      onClick={onClick}
    />
  )
}

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetchAll()
  },
  view(state, prev, actions) {
    return (
      <div>
        <div id='scroller' className='pos-fixed post-0 posl-0 w-100 h-100 of-auto'>
          <Waypoint onEnter={() => actions.home.setCurrentSection(0)} bottomOffset={100}>
            <div
              id='section-0'
              className='h-100 pa-4 d-flex align-items-center fs-huge fw-500 lh-5'
            >
              <div>
                <p>Catchy Strapline</p>
                <p>To Make $$$</p>
              </div>
            </div>
          </Waypoint>
          <Waypoint onEnter={() => actions.home.setCurrentSection(1)} topOffset={100} bottomOffset={100}>
            <div
              id='section-1'
              className='minh-100 pa-4 bg-grey-50'
            >
            </div>
          </Waypoint>
          <Waypoint onEnter={() => actions.home.setCurrentSection(2)} topOffset={100}>
            <div
              id='section-2'
              className='h-100 pa-4'
            >
            </div>
          </Waypoint>
        </div>

        <div className='pos-fixed posr-0 post-0 pa-4 h-100 d-flex flex-direction-column'>
          <div className='o-0'>
            <Icon icon='arrow-down' />
          </div>
          <div className='flex-1 d-flex flex-direction-column'>
            <div className='flex-1' />
            <Pill
              onClick={() => actions.home.scrollToSection(0)}
              filled={state.home.currentSection === 0}
              className='mb-2 mh-auto'
            />
            <Pill
              onClick={() => actions.home.scrollToSection(1)}
              filled={state.home.currentSection === 1}
              className='mb-2 mh-auto'
            />
            <Pill
              onClick={() => actions.home.scrollToSection(2)}
              filled={state.home.currentSection === 2}
              className='mh-auto'
            />
            <div className='flex-1' />
          </div>
          <div onClick={actions.home.showNextSection}>
            <Icon
              icon='arrow-down'
              className='transition relative'
              style={{
                transform: state.home.currentSection === 2 ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
        </div>
      </div>
    )
  },
}

export default page
