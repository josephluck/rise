import h from 'helix-react/lib/html'
import {Models} from '../../model'
import Tabs from '../../components/tabs'
import CartIcon from '../../components/cart-icon'
import CartAlert from '../../components/cart-alert'

function getActiveTab (pathname) {
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

function layout (page: Helix.Page<Models>): Helix.Page<Models> {
  return {
    onEnter: page.onEnter,
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      const activeTab = getActiveTab(state.location.pathname)
      const inCart = state.location.pathname.indexOf('cart') > -1
      return (
        <div className='pb-5'>
          <div className='d-flex align-items-center w-100 pa-3'>
            <div className='flex-1' />
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
            items={inCart ? 0 : state.cart.quantity}
          />
        </div>
      )
    },
  }
}

export default layout
