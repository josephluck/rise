import h from 'helix-react/lib/html'
import {Models} from '../model'
import CartItem from '../components/cart-item'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    return (
      <div className='pa-4'>
        <div className='bt bc-grey-100 fs-heading pt-4 mb-5 fw-500 ta-c'>My Basket</div>
        <div className='bt bc-grey-100'>
          {state.cart.items.map((item, index) => {
            return (
              <CartItem
                key={index}
                updateQuantity={(quantity) => actions.cart.update({
                  index,
                  item: {
                    ...item,
                    quantity,
                  },
                })}
                removeItem={() => actions.cart.remove(index)}
                {...item}
              />
            )
          })}
        </div>
      </div>
    )
  },
}

export default page
