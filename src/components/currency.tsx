import h from 'helix-react/lib/html'

export const formatCurrency = (price) => price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')

export default function ({ price }: { price: number }) {
  return (
    <span>{formatCurrency(price)}</span>
  )
}
