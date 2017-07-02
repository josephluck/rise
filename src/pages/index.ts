import lMain from './layout/main'

import home from './home'
import blog from './blog'
import about from './about'
import post from './post'
import cart from './cart'
import shop from './shop'
import product from './product'
import order from './order'
import complete from './complete'
import contact from './contact'

export default {
  '/': lMain(home),
  '/blog': lMain(blog),
  '/about': lMain(about),
  '/contact': lMain(contact),
  '/blog/:postId': lMain(post, {
    showBackArrow: true,
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
  '/cart': lMain(cart('cart'), {
    showTabs: true,
    showCartIcon: true,
    showAlert: false,
  }),
  '/checkout': lMain(cart('checkout'), {
    showBackArrow: true,
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
  '/checkout/complete': lMain(complete, {
    showBackArrow: true,
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
  '/shop': lMain(shop),
  '/shop/:productId': lMain(product, {
    showBackArrow: true,
    showTabs: false,
    showCartIcon: true,
    showAlert: true,
  }),
  '/orders/:orderId': lMain(order, {
    showBackArrow: true,
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
}
