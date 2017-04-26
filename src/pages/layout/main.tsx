import h from 'helix-react/lib/html'
import * as Collapse from 'react-collapse'
import {Models} from '../../model'
import Tabs from '../../components/tabs'
import CartIcon from '../../components/cart-icon'
import CartAlert from '../../components/cart-alert'
import Show from '../../components/show'

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

interface Opts {
  backLocation?: string
  showTabs?: boolean
  showCartIcon?: boolean
  showAlert?: boolean
}

const defaultOpts: Opts = {
  backLocation: '',
  showTabs: true,
  showCartIcon: true,
  showAlert: true,
}

function layout (page: Helix.Page<Models>, opts: Opts = defaultOpts): Helix.Page<Models> {
  return {
    onEnter: page.onEnter,
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      const activeTab = getActiveTab(state.location.pathname)
      return (
        <div className='pb-5'>
          <div className='d-flex align-items-center w-100 pa-3'>
            <div className='flex-1'>
              <Show showing={!!opts.backLocation}>
                <a href={opts.backLocation} className='ss-navigateleft fc-grey-500'>
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
          <Collapse hasNestedCollapse isOpened={opts.showTabs} className='ta-c'>
            <Tabs
              tabs={[
                {label: 'Shop', name: 'shop', href: '/shop'},
                {label: 'About', name: 'about', href: '/about'},
                {label: 'Blog', name: 'blog', href: '/blog'},
                {label: 'Contact', name: 'contact', href: '/contact'},
              ]}
              activeTab={activeTab}
            />
          </Collapse>
          <div>
            {page.view(state, prev, actions)}
          </div>
          <CartAlert
            items={!opts.showAlert ? 0 : state.cart.totals.quantity}
          />
        </div>
      )
    },
  }
}

export default layout
