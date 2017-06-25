import h from 'helix-react/lib/html'
import { Models } from '../model'
import Button from '../components/button'
import Person from '../components/person'

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetchAll()
  },
  view(state, prev, actions) {
    return (
      <div>
        <div className='mb-6'>
          <img
            src='/assets/images/thank-you.jpg'
            className='h-auto w-100 mb-3'
          />
        </div>
        <div className='mb-6'>
          <div className='fs-heading ta-c mb-4 fw-500'>
            Meet the Team
          </div>
          <div className='of-hidden d-flex flex-wrap-wrap'>
            {state.contact.people.map((person, index) => {
              return (
                <Person
                  key={index}
                  className={`d-b w-50 pb-4 f-l ${index % 2 === 0 ? 'pr-2' : 'pl-2'}`}
                  name={person.name}
                  avatar={person.avatar}
                  description={person.description}
                />
              )
            })}
          </div>

          <Button
            label='Read our Blog'
            href='/blog'
            size='large'
            className='bra-pill w-100 ta-c'
          />

          <div className='pt-3 ta-c fs-small fc-grey-600 lh-5'>
            <p className='mb-1'>
              RISE BAKERY, 82 WENTWORTH STREET, LONDON, E1 7SA
            </p>
            <p className='mb-1'>
              020 7422 6761
            </p>
            <p className='mb-1'>
              BAKERY@PROVIDENCEROW.ORG.UK
            </p>
            <p className='mb-1'>
              Rise Bakery is part of Providence Row, a charitable company limited by guarantee registered in England and Wales with company number 07452798 and registered charity number 1140192. Rise Bakery's registered office is at The Dellow Centre, 82 Wentworth Street, London, E1 7SA
            </p>
          </div>
        </div>
      </div>
    )
  },
}

export default page
