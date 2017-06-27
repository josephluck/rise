import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import { Models } from '../../model'
import Tabs from '../../components/tabs'
import CartIcon from '../../components/cart-icon'
import CartAlert from '../../components/cart-alert'
import Show from '../../components/show'
import Icon from '../../components/icon'

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
  showBackArrow?: boolean
  showTabs?: boolean
  showCartIcon?: boolean
  showAlert?: boolean
}

const defaultOpts: Opts = {
  showBackArrow: false,
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
        <div className='pb-5'>
          <div className='pa-3'>
            <div className='d-flex align-items-center w-100'>
              <div className='flex-1'>
                <Show showing={!!opts.showBackArrow}>
                  <a onClick={goBack}>
                    <Icon icon='arrow-left' />
                  </a>
                </Show>
              </div>
              <a
                className='d-b fw-700'
                href='/'
              >
                <img
                  src='/assets/rise.png'
                  style={{
                    height: 'auto',
                    width: '50px',
                  }}
                />
              </a>
              <div className='d-flex flex-1 align-items-center'>
                <div className='flex-1' />
                <Show showing={opts.showCartIcon}>
                  <CartIcon active={!!state.cart.items.length} />
                </Show>
              </div>
            </div>
            <Collapse
              hasNestedCollapse
              isOpened={opts.showTabs}
              className='ta-c'
            >
              <div>
                <Tabs
                  tabs={[
                    { label: 'Shop', name: 'shop', href: '/shop' },
                    { label: 'About', name: 'about', href: '/about' },
                    { label: 'Blog', name: 'blog', href: '/blog' },
                    { label: 'Contact', name: 'contact', href: '/contact' },
                  ]}
                  activeTab={activeTab}
                />
              </div>
            </Collapse>
            <div className={!opts.showTabs ? 'mt-3' : ''}>
              {page.view(state, prev, actions)}
            </div>
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
