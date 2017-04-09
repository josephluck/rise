import lMain from './layout/main'

import home from './home'
import shop from './shop'
import cart from './cart'

export default {
  '/': lMain(home),
  '/cart': lMain(cart),
  '/shop': lMain(shop),
}