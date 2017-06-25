import h from 'helix-react/lib/html'

export interface Props {
  label?: string
  className?: string
  type?: string
  autoFocus?: boolean
  value: string
  errors: string[]
  onChange: (value: string) => any
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
      <input
        type={type}
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          d-ib w-100 ba bg-white pa-2
          ${errors.length ? 'bc-red bc-red-f' : 'bc-grey-300 bc-primary-f'}
        `}
      />
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
