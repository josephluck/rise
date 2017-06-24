import h from 'helix-react/lib/html'

import Icon from './icon'

interface BtnProps {
  icon: Icons.Icon
  className?: string
  onClick: () => any
}

function Btn({
  icon,
  className,
  onClick,
}: BtnProps) {
  return (
    <span
      className={`
        d-if align-items-center bc-grey-600 pa-1 fs-tiny lh-4 
      `}
      onClick={onClick}
    >
      <Icon
        icon={icon}
        className={`ml-auto mr-auto ${className}`}
        style={{
          height: 12,
          width: 12,
        }}
      />
    </span>
  )
}

export interface Props {
  className?: string
  placeholder?: string
  value: string
  onChange: (value: string) => any
}
const options = Array.from({ length: 99 }, (_, i) => {
  return { label: i.toString(), value: i.toString() }
})
export default function ({
  className = '',
  placeholder = '',
  value,
  onChange,
}: Props) {
  const num = parseInt(value, 10)
  function decrement() {
    if (num > 0) {
      return onChange((num - 1).toString())
    }
  }
  function increment() {
    return onChange((num + 1).toString())
  }
  return (
    <div className={`d-if align-items-center of-hidden ${className}`}>
      <Btn
        icon='minus'
        className='mr-1'
        onClick={decrement}
      />
      <select
        className='fw-300 fs-small ta-c bc-transparent bg-transparent bra-0'
        style={{ textAlignLast: 'center' }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => {
          return (
            <option value={option.value} key={index}>
              {option.label}
            </option>
          )
        })}
      </select>
      <Btn
        icon='plus'
        className='ml-1'
        onClick={increment}
      />
    </div>
  )
}
