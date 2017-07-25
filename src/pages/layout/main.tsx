import h from 'helix-react/lib/html'
import { Models } from '../../model'
import CartIcon from '../../components/cart-icon'
// import CartAlert from '../../components/cart-alert'
import Show from '../../components/show'
import Icon from '../../components/icon'
import NavMenu from '../../components/nav-menu'

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
        actions.home.scrollToSection(0)
        if (window.history.length > 1) {
          window.history.go(-1)
        } else {
          actions.location.set('/')
        }
      }
      return (
        <div className='pb-5'>
          <div className='pa-4'>
            <div className='pos-fixed post-0 posl-0 z-1 pa-4 d-flex align-items-center w-100 bg-white'>
              <Show
                showing={!!opts.showBackArrow}
                width={true}
              >
                <a onClick={goBack}>
                  <Icon icon='arrow-left' />
                </a>
              </Show>
              <a
                className='d-b fw-700'
                href='/'
                onClick={() => {
                  actions.home.scrollToSection(0)
                }}
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
                <NavMenu className='ml-3' />
              </div>
            </div>
            {page.view(state, prev, actions)}
          </div>
          {/*<CartAlert
            items={!opts.showAlert ? 0 : state.checkout.totals.quantity}
          />*/}
        </div>
      )
    },
  }
}

export default layout
