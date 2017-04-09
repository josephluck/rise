import h from 'helix-react/lib/html'

export interface Props {
  label?: string
  className?: string
  type?: string
  autoFocus?: boolean
}

export default function ({
  label,
  className = '',
  type = 'text',
  autoFocus = false,
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
        className='d-ib w-100 ba bc-grey-200 bg-white pa-2 bra-2 bc-primary-f'
      />
    </div>
  )
}