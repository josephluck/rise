import lMain from './layout/main'

import home from './home'
import blog from './blog'
import post from './post'
import cart from './cart'
import shop from './shop'
import product from './product'

export default {
  '/': lMain(home),
  '/blog': lMain(blog),
  '/blog/:blogId': lMain(post),
  '/cart': lMain(cart('cart'), {
    showTabs: true,
    showCartIcon: true,
    showAlert: false,
  }),
  '/checkout': lMain(cart('checkout'), {
    backLocation: '/cart',
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
  '/shop': lMain(shop),
  '/shop/:productId': lMain(product),
}
