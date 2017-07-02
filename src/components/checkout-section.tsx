import h from 'helix-react/lib/html'

import * as Collapse from 'react-collapse'
import Icon from '../components/icon'

interface SectionProps {
  isComplete: boolean
  hasErrors: boolean
  formShowing: boolean
  label: React.ReactNode
  description: React.ReactNode
  form: React.ReactNode
  toggleFormShowing: () => any
}

export default function Section({
  isComplete,
  hasErrors,
  formShowing,
  label,
  description,
  form,
  toggleFormShowing,
}: SectionProps) {
  return (
    <div className='pa-3 ba bc-grey-100'>
      <div
        onClick={toggleFormShowing}
        className='d-flex align-items-center'
      >
        <div className='flex-1 d-flex flex-direction-column align-items-center of-hidden pr-3'>
          <div className='w-100 fw-500'>
            {label}
          </div>
          <div className='w-100'>
            <Collapse
              hasNestedCollapse
              isOpened={!formShowing && isComplete}
            >
              <div
                className='fs-tiny pt-2 fc-grey-500 of-hidden'
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
        <div>
          <Collapse
            hasNestedCollapse
            className='w-100'
            isOpened={!formShowing && !hasErrors && isComplete}
          >
            <Icon icon='check' />
          </Collapse>
          <Collapse
            hasNestedCollapse
            className='w-100'
            isOpened={!formShowing && !hasErrors && !isComplete}
          >
            <Icon icon='arrow-right' />
          </Collapse>
          <Collapse
            hasNestedCollapse
            className='w-100'
            isOpened={!formShowing && hasErrors}
          >
            <Icon icon='alert' />
          </Collapse>
        </div>
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