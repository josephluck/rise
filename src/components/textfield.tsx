import h from 'helix-react/lib/html'

export interface Props {
  label?: string
  className?: string
  type?: string
  autoFocus?: boolean
  value: string
  errors: string[]
  onChange: (value: string) => any
}

export default function ({
  label,
  className = '',
  type = 'text',
  autoFocus = false,
  value,
  errors,
  onChange,
}: Props) {
  return (
    <div className={className}>
      {label
        ? (
          <label className='d-ib w-100 mb-2 fc-grey-500 fs-small'>
            {label}
          </label>
        ) : null
      }
      <input
        type={type}
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
          d-ib w-100 ba bg-white pa-2 bra-2
          ${errors.length ? 'bc-red bc-red-f' : 'bc-grey-200 bc-primary-f'}
        `}
      />
      {errors.map((error, index) => {
        return (
          <div
            key={index}
            className='mt-2 fs-small fc-red'
          >
            {error}
          </div>
        )
      })}
    </div>
  )
}