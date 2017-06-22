import h from 'helix-react/lib/html'
import { Models } from '../model'
import Product from '../components/product'

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetch()
  },
  view(state, prev, actions) {
    return (
      <div className='of-hidden d-flex flex-wrap-wrap pa-3'>
        {state.products.items.concat(state.products.items).map((product, index) => {
          return (
            <div
              className={`w-50 pb-4 f-l ${index % 2 === 0 ? 'pr-2' : 'pl-2'}`}
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
