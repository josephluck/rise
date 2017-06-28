import h from 'helix-react/lib/html'
import { Models } from '../model'
import Html from '../components/html'

const page: Helix.Page<Models> = {
  onEnter(state, _prev, actions) {
    actions.blog.getPost(state.location.params.postId)
  },
  view(state, prev, actions) {
    const post = state.blog.post
    if (post) {
      return (
        <div className='pv-3'>
          <div className='ta-c mb-4'>
            <div className='fw-500 mb-3 fs-large'>{post.title}</div>
            <div className='fc-grey-600 fs-small'>By {post.author.name}</div>
          </div>
          <div className='lh-5'>
            <Html>
              {post.content}
            </Html>
          </div>
        </div>
      )
    } else {
      return null
    }
  },
}

export default page
