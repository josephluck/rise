import h from 'helix-react/lib/html'
import { Models } from '../model'
import Product from '../components/product'

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetchAll()
  },
  view(state, prev, actions) {
    return (
      <div className='of-hidden d-flex flex-wrap-wrap pb-3 ph-2 ph-3-l'>
        {state.products.products
          .concat(state.products.products)
          .map((product, index) => {
            return (
              <a
                className='d-b w-50 w-33-m w-25-l pb-4 f-l'
                style={{
                  borderLeft: 'solid 0.5rem transparent',
                  borderRight: 'solid 0.5rem transparent',
                  borderBottom: 'solid 1rem transparent',
                }}
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
