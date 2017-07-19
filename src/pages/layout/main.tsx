import h from 'helix-react/lib/html'
import { Models } from '../../model'
import CartAlert from '../../components/cart-alert'
import Navigation from '../../components/navigation'

function getActiveTab(pathname) {
  if (pathname.includes('shop') || pathname.includes('cart')) {
    return 'shop'
  } else if (pathname.includes('about')) {
    return 'about'
  } else if (pathname.includes('blog')) {
    return 'blog'
  } else if (pathname.includes('contact')) {
    return 'contact'
  }
}

interface Opts {
  backTo?: boolean
  showTabs?: boolean
  showCartIcon?: boolean
  showAlert?: boolean
}

const defaultOpts: Opts = {
  backTo: false,
  showTabs: true,
  showCartIcon: true,
  showAlert: true,
}

function layout(page: Helix.Page<Models>, opts: Opts = defaultOpts): Helix.Page<Models> {
  return {
    onEnter(state, prev, actions) {
      actions.user.authenticate()
      if (!state.cart.items.length) {
        actions.cart.sync()
      }
      if (page.onEnter) {
        page.onEnter(state, prev, actions)
      }
    },
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view(state, prev, actions) {
      const goBack = () => {
        if (window.history.length > 1) {
          window.history.go(-1)
        } else {
          actions.location.set('/')
        }
      }
      const activeTab = getActiveTab(state.location.pathname)

      return (
        <div className='d-flex maxw-50 ml-auto mr-auto'>
          <div className={`h-100vh of-auto transition w-100`}>
            <Navigation
              backTo={opts.backTo}
              goBack={goBack}
              showCartIcon={opts.showCartIcon}
              cartIconActive={!!state.cart.items.length}
              showTabs={opts.showTabs}
              activeTab={activeTab}
            />
            {page.view(state, prev, actions)}
          </div>
          <CartAlert
            items={!opts.showAlert ? 0 : state.checkout.totals.quantity}
          />
        </div>
      )
    },
  }
}

export default layout
