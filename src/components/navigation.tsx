import h from 'helix-react/lib/html'

import * as Collapse from 'react-collapse'
import Tabs from './tabs'
import CartIcon from './cart-icon'
import Show from './show'
import Icon from './icon'

interface Props {
  backTo: boolean
  goBack: () => any
  showCartIcon: boolean
  cartIconActive: boolean
  showTabs: boolean
  activeTab: string
}

export default function ({
  backTo,
  goBack,
  showCartIcon,
  cartIconActive,
  showTabs,
  activeTab,
}: Props) {
  return (
    <div>
      <div className='d-flex align-items-center w-100 pt-3 ph-3'>
        <div className='flex-1'>
          <Show showing={!!backTo}>
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
          <Show showing={showCartIcon}>
            <CartIcon active={cartIconActive} />
          </Show>
        </div>
      </div>
      <Collapse
        hasNestedCollapse
        isOpened={showTabs}
        className='ta-c'
      >
        <div className='ph-3'>
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
    </div>
  )
}
