import h from 'helix-react/lib/html'
import { Models } from '../model'
import Product from '../components/product'

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetchAll()
  },
  view(state, prev, actions) {
    return (
      <div className='of-hidden d-flex flex-wrap-wrap pa-3'>
        {state.products.products.map((product, index) => {
          return (
            <a
              className={`d-b w-50 pb-4 f-l ${index % 2 === 0 ? 'pr-2' : 'pl-2'}`}
              href={`/shop/${product.id}`}
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
            </a>
          )
        })}
      </div>
    )
  },
}

export default page
