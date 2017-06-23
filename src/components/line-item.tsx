import h from 'helix-react/lib/html'
import Currency from './currency'

interface LineItemProps {
  label: string
  amount: number
  className?: string
}

export default function LineItem ({
  label,
  amount,
  className,
}: LineItemProps) {
  return (
    <div className={`ta-c ${className}`}>
      <div className='pb-2 fs-small tt-uppercase'>{label}</div>
      <div className='fs-medium'>{'£'}<Currency price={amount} /></div>
    </div>
  )
}
