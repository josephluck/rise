import h from 'helix-react/lib/html'

export interface Option {
  label: string
  value: string
}

export interface Props {
  label?: string
  className?: string
  type?: string
  autoFocus?: boolean
  value: string
  errors: string[]
  onChange: (value: string) => any
  options: Option[]
  placeholder?: string
}

export default function ({
  label,
  className = '',
  type = 'text',
  autoFocus = false,
  value,
  errors,
  onChange,
  placeholder,
  options,
}: Props) {
  return (
    <div className={className}>
      {label
        ? (
          <label className='d-ib w-100 mb-1 fc-grey-500 fs-small'>
            {label}
          </label>
        ) : null
      }
      <select
        defaultValue={placeholder}
        className={`
          d-ib w-100 ba bg-white pa-2 bra-2
          ${errors.length ? 'bc-red bc-red-f' : 'bc-grey-300 bc-primary-f'}
        `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {placeholder ?
          <option disabled selected={!value}>{placeholder}</option>
          : null
        }
        {options.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          )
        })}
      </select>
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
