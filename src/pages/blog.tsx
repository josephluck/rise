import h from 'helix-react/lib/html'
import { Models } from '../model'
import PostItem from '../components/post-item'

const page: Helix.Page<Models> = {
  onEnter(state, prev, actions) {
    actions.blog.getPosts()
  },
  view(state, prev, actions) {
    return (
      <div className='pb-4 ph-3 ph-4-l'>
        {state.blog.posts.map((post, index) => {
          return (
            <PostItem
              key={index}
              className='mb-4 bb bc-grey-100'
              {...post}
            />
          )
        })}
      </div>
    )
  },
}

export default page
