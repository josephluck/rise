import lMain from './layout/main'

import home from './home'
import blog from './blog'
import post from './post'
import cart from './cart'
import shop from './shop'
import product from './product'
import order from './order'
import complete from './complete'

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
  '/checkout/complete': lMain(complete, {
    backLocation: '/shop',
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
  '/shop': lMain(shop),
  '/shop/:productId': lMain(product, {
    backLocation: '/shop',
    showTabs: false,
    showCartIcon: true,
    showAlert: true,
  }),
  '/orders/:orderId': lMain(order, {
    backLocation: '/orders',
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
}
