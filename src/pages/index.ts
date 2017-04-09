import lMain from './layout/main'

import home from './home'
import blog from './blog'
import post from './post'
import cart from './cart'
import shop from './shop'

export default {
  '/': lMain(home),
  '/blog': lMain(blog),
  '/blog/:blogId': lMain(post),
  '/cart': lMain(cart),
  '/shop': lMain(shop),
}
