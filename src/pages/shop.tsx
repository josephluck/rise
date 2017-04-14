import h from 'helix-react/lib/html'
import {Models} from '../model'
import Product from '../components/product'

const page: Helix.Page<Models> = {
  onEnter (_state, _prev, actions) {
    actions.products.fetch()
  },
  view (state, prev, actions) {
    return (
      <div className='ph-3 pv-5'>
        {state.products.items.map((product, index) => {
          return (
            <div
              className='w-100 mb-8 pb-3 bb bc-grey-100'
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
