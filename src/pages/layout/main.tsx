import h from 'helix-react/lib/html'
import {Models} from '../../model'
import Tabs from '../../components/tabs'
import CartIcon from '../../components/cart-icon'
import CartAlert from '../../components/cart-alert'

function getActiveTab (pathname) {
  if (pathname.indexOf('shop') > -1) {
    return 'shop'
  } else if (pathname.indexOf('about') > -1) {
    return 'about'
  } else if (pathname.indexOf('blog') > -1) {
    return 'blog'
  } else if (pathname.indexOf('contact') > -1) {
    return 'contact'
  }
}

function layout (page: Helix.Page<Models>): Helix.Page<Models> {
  return {
    onEnter: page.onEnter,
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      const activeTab = getActiveTab(state.location.pathname)
      return (
        <div className='pb-5'>
          <div className='d-flex align-items-center w-100 pa-3'>
            <span className='ss-menu fc-grey-500'></span>
            <a
              className='d-b flex-1 fw-700 ta-c'
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
            <div className='d-flex align-items-center'>
              <CartIcon active={!!state.cart.items.length} />
            </div>
          </div>
          <div className='ta-c'>
            <Tabs
              tabs={[
                {label: 'Shop', name: 'shop', href: '/shop'},
                {label: 'About', name: 'about', href: '/about'},
                {label: 'Blog', name: 'blog', href: '/blog'},
                {label: 'Contact', name: 'contact', href: '/contact'},
              ]}
              activeTab={activeTab}
            />
          </div>
          <div>
            {page.view(state, prev, actions)}
          </div>
          <CartAlert
            items={state.cart.quantity}
          />
        </div>
      )
    },
  }
}

export default layout
