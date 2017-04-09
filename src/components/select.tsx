import h from 'helix-react/lib/html'

export interface Option {
  label: string
  value: string
}

export interface Props {
  className?: string
  placeholder?: string
  options: Option[]
  value: string
  onChange: (value: string) => any
}

export default function ({
  className = '',
  placeholder = '',
  options,
  value,
  onChange,
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
