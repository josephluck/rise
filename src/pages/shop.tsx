import h from 'helix-react/lib/html'
import Product from '../components/product'

const page = {
  view (state, prev, actions) {
    return (
      <div className='d-flex flex-wrap-wrap pa-3'>
        {state.products.items.map((product, index) => {
          return (
            <div
              className='w-100 pa-3'
              key={index}
            >
              <Product
                {...product}
              />
            </div>
          )
        })}
      </div>
    )
  },
}

export default page
