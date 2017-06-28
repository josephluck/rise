import h from 'helix-react/lib/html'
import LineItem from '../components/line-item'

interface Props {
  totals: Core.Totals
  className?: string
}

export default function Totals({
  totals,
  className = '',
}: Props) {
  return (
    <div className={`d-flex ${className}`}>
      <LineItem
        label='Sub Total'
        amount={totals.subTotal}
        className='flex-1 fc-grey-700'
      />
      <LineItem
        label='Shipping'
        amount={totals.shipping}
        className='flex-1 fc-grey-700'
      />
      <LineItem
        label='Total'
        amount={totals.total}
        className='flex-1'
      />
    </div>
  )
}
