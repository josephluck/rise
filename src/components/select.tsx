import h from 'helix-react/lib/html'

export interface Option {
  label: string
  value: string
}

export interface Props {
  className?: string
  placeholder?: string
  options: Option[]
}

export default function ({
  className = '',
  placeholder = '',
  options,
}: Props) {
  return (
    <select
      defaultValue={placeholder}
      className={`
        ph-3 pv-2 fw-300 bw-small fs-small bc-grey-600 bg-white bra-2 tt-uppercase ta-c
        ${className}
      `}
      style={{
        textAlignLast: 'center',
      }}
    >
      {placeholder ?
        <option value={placeholder}>{placeholder}</option>
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
  )
}
