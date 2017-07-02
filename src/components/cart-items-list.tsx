import h from 'helix-react/lib/html'
import CartItem from '../components/cart-item'

interface Props {
  items: Core.CartEntry[]
  showControls?: boolean
  updateQuantity?: (item: Core.CartEntry, quantity: number, index: number) => any
  removeItem?: (index: number) => any
  className?: string
}

export default function CartItemsList({
  items,
  showControls = false,
  updateQuantity = () => null,
  removeItem = () => null,
  className = '',
}: Props) {
  return (
    <div className={className}>
      {items.map((item, index) => {
        return (
          <CartItem
            key={index}
            showControls={showControls}
            updateQuantity={(quantity) => updateQuantity(item, quantity, index)}
            removeItem={() => removeItem(index)}
            className={`pa-3 ${index !== 0 ? 'bt' : ''}`}
            {...item}
          />
        )
      })}
    </div>
  )
}
