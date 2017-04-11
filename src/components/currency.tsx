import h from 'helix-react/lib/html'

export default function ({price}: {price: number}) {
  const formattedPrice = price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  return (
    <span>{formattedPrice}</span>
  )
}
