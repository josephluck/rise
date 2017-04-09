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
        d-inline-flex align-items-center
        ba bc-grey-200 pa-1 bra-2 fc-grey-400 fs-tiny
      `}
      onClick={onClick}
    > 
      <span className={`ml-auto mr-auto ${className}`} />
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
    <div className={`d-inline-flex align-items-center ${className}`}>
      <Btn
        className={`${num === 1 ? 'ss-trash' : 'ss-hyphen'} mr-1`}
        onClick={decrement}
      />
      <select
        className='ph-1 pv-1 fw-300 fs-small ta-c bc-white bg-white'
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
