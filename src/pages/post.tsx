import h from 'helix-react/lib/html'
import { Models } from '../model'
import Html from '../components/html'
import PostItem from '../components/post-item'

const page: Helix.Page<Models> = {
  onEnter(state, _prev, actions) {
    if (!state.blog.posts.length) {
      actions.blog.getPosts()
    }
    actions.blog.getPost(state.location.params.postId)
  },
  view(state, prev, actions) {
    const post = state.blog.post
    if (post) {
      const posts = state.blog.posts.filter(post => post.id !== post.id)
      return (
        <div className='pv-3'>
          <div className='ta-c mb-4'>
            <div className='fw-500 mb-3 fs-large'>{post.title}</div>
            <div className='fc-grey-600 fs-small'>By {post.author.name}</div>
          </div>
          <div className='lh-5 mb-6'>
            <Html>
              {post.content}
            </Html>
          </div>
          {posts.length
            ? (
              <div>
                <div className='mb-5 ta-c fs-large fw-500'>More Posts</div>
                {posts.map((post, index) => {
                  return (
                    <PostItem
                      key={index}
                      className='mb-4 bb bc-grey-100'
                      {...post}
                    />
                  )
                })}
              </div>
            ) : null
          }
        </div>
      )
    } else {
      return null
    }
  },
}

export default page
