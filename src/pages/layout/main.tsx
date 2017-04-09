import h from 'helix-react/lib/html'

const layout = (page) => {
  return {
    onEnter: page.onEnter,
    onUpdate: page.onUpdate,
    onLeave: page.onLeave,
    view (state, prev, actions) {
      return (
        <div>
          <div className='d-flex align-items-center w-100 pa-4'>
            <div
              className='flex-1 fw-700'
            >
              <img
                src='/assets/rise.png'
                style={{
                  height: 'auto',
                  width: '50px',
                }}
              />
            </div>
            <div className='ta-r'>
              <span className='fw-500 fc-grey-700 di-b ml-3 tt-uppercase fs-small ff-link'>Home</span>
              <span className='fw-500 fc-grey-700 di-b ml-3 tt-uppercase fs-small ff-link'>Gift</span>
              <span className='fw-500 fc-grey-700 di-b ml-3 tt-uppercase fs-small ff-link'>About</span>
              <span className='fw-500 fc-grey-700 di-b ml-3 tt-uppercase fs-small ff-link'>Blog</span>
              <span className='fw-500 fc-grey-700 di-b ml-3 tt-uppercase fs-small ff-link'>Contact</span>
            </div>
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
