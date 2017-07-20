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
  '/': home,
  '/blog': lMain(blog),
  '/about': lMain(about),
  '/contact': lMain(contact),
  '/blog/:postId': lMain(post, {
    backTo: true,
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
    backTo: true,
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
  '/checkout/complete': lMain(complete, {
    backTo: true,
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
  '/shop': lMain(shop),
  '/shop/:productId': lMain(product, {
    backTo: true,
    showTabs: false,
    showCartIcon: true,
    showAlert: true,
  }),
  '/orders/:orderId': lMain(order, {
    backTo: true,
    showTabs: false,
    showCartIcon: false,
    showAlert: false,
  }),
}
