import h from 'helix-react/lib/html'
import Tabs from '../../components/tabs'

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

const layout = (page) => {
  return {
    onEnter: page.onEnter,
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      const activeTab = getActiveTab(state.location.pathname)
      return (
        <div>
          <div className='d-flex align-items-center w-100 pa-3'>
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
          </div>
          <div className='bb bc-grey-100 bt ta-c'>
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
        </div>
      )
    },
  }
}

export default layout
