import h from 'helix-react/lib/html'
import {Models} from '../model'
import Product from '../components/product'

const page: Helix.Page<Models> = {
  view (state, prev, actions) {
    return (
      <div className='d-flex flex-wrap-wrap pa-3'>
        {state.products.items.map((product, index) => {
          return (
            <div
              className='w-100 pv-3'
              key={index}
            >
              <Product
                {...product}
                onAddToCart={(quantity) => {
                  actions.cart.add({
                    ...product,
                    quantity,
                  })
                }}
              />
            </div>
          )
        })}
      </div>
    )
  },
}

export default page
