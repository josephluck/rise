import lMain from './layout/main'

import home from './home'
import blog from './blog'
import cart from './cart'
import shop from './shop'

export default {
  '/': lMain(home),
  '/blog': lMain(blog),
  '/cart': lMain(cart),
  '/shop': lMain(shop),
}
