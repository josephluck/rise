import h from 'helix-react/lib/html'

interface BtnProps {
  className?: string
  onClick: () => any
}

function Btn ({
  className,
  onClick,
}: BtnProps) {
  return (
    <span
      className={`
        d-ib ba bc-grey-600 pa-1 fs-tiny lh-4 bra-2
      `}
      onClick={onClick}
    > 
      <span className={`ml-auto mr-auto fc-grey-800 ${className}`} />
    </span>
  )
}

export interface Props {
  className?: string
  placeholder?: string
  value: string
  onChange: (value: string) => any
}
const options = Array.from({length: 99}, (_, i) => {
  return {label: i.toString(), value: i.toString()}
})
export default function ({
  className = '',
  placeholder = '',
  value,
  onChange,
}: Props) {
  const num = parseInt(value, 10)
  function decrement () {
    if (num > 0) {
      return onChange((num - 1).toString())
    }
  }
  function increment () {
    return onChange((num + 1).toString())
  }
  return (
    <div className={`d-inline-flex align-items-center of-hidden ${className}`}>
      <Btn
        className={`ss-hyphen mr-1`}
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
        className='ss-plus ml-1'
        onClick={increment}
      />
    </div>
  )
}
