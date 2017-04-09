import h from 'helix-react/lib/html'
import {Models} from '../model'

const page: Helix.Page<Models> = {
  onEnter (_state, _prev, actions) {
    actions.blog.getPost()
  },
  view (state, prev, actions) {
    const post = state.blog.post
    if (post) {
      return (
        <div className='ph-4 pb-4 pt-5'>
          <div className='ta-c mb-4'>
            <div className='fw-500 mb-3 fs-large'>{post.title}</div>
            <div className='fc-grey-600 fs-small'>By {post.by}</div>
          </div>
          <div className='lh-5'>
            {post.description}
          </div>
        </div>
      )
    } else {
      return null
    }
  },
}

export default page
