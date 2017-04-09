// Layouts
import lMain from './layout/main'

import home from './home'
import shop from './shop'

export default {
  '/': lMain(home),
  '/shop': lMain(shop),
}