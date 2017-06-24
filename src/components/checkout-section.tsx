import h from 'helix-react/lib/html'

import * as Collapse from 'react-collapse'
import Show from '../components/show'
import Icon from '../components/icon'

interface SectionProps {
  id: number
  complete: boolean
  formShowing: boolean
  label: React.ReactNode
  description: React.ReactNode
  form: React.ReactNode
  toggleFormShowing: () => any
}

export default function Section({
  id,
  complete,
  formShowing,
  label,
  description,
  form,
  toggleFormShowing,
}: SectionProps) {
  return (
    <div className='pa-3 ba bc-grey-100 bra-2'>
      <div
        onClick={toggleFormShowing}
        className='d-flex align-items-center'
      >
        <div className='mr-3'>
          {complete
            ? <Icon icon='check' />
            : id
          }
        </div>
        <div className='flex-1 d-flex flex-direction-column align-items-center of-hidden pr-3'>
          <div className='w-100 fw-500'>
            {label}
          </div>
          <div className='w-100'>
            <Collapse
              hasNestedCollapse
              isOpened={!formShowing && complete}
            >
              <div
                className='fs-tiny pt-1 fc-grey-500 of-hidden'
                style={{
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
              >
                {description}
              </div>
            </Collapse>
          </div>
        </div>
        <Show showing={!formShowing}>
          <Icon icon='arrow-right' />
        </Show>
      </div>
      <Collapse
        hasNestedCollapse
        isOpened={formShowing}
      >
        <div className='pt-2'>
          {form}
        </div>
      </Collapse>
    </div>
  )
}