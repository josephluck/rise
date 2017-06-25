import h from 'helix-react/lib/html'

export interface Props {
  label?: string
  className?: string
  type?: string
  autoFocus?: boolean
  value: string
  errors: string[]
  onChange: (value: string) => any
  options: Core.OptionSelectorOption[]
  placeholder?: string
  required?: boolean
}

export default function ({
  label,
  className = '',
  type = 'text',
  autoFocus = false,
  value,
  errors = [],
  onChange,
  placeholder,
  options,
  required = false,
}: Props) {
  return (
    <div className={className}>
      {label
        ? (
          <label className='d-ib w-100 mb-1 fc-grey-500 fs-small'>
            {label}{required ? '*' : ''}
          </label>
        ) : null
      }
      <div className='d-ib w-100 ba bg-white bc-grey-300'>
        {options.map((option, index) => {
          return (
            <label
              className={`d-if bc-grey-300 align-items-center w-100 pa-3 ${index > 0 ? 'bt' : ''}`}
              key={index}
            >
              <input
                value={option.value}
                onChange={() => onChange(option.value)}
                className='mr-2'
                type='radio'
                checked={option.value === value}
              />
              {option.label}
            </label>
          )
        })}
      </div>
      {errors.map((error, index) => {
        return (
          <div
            key={index}
            className='pt-1 fs-small fc-red'
          >
            {error}
          </div>
        )
      })}
    </div>
  )
}
