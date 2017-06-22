import h from 'helix-react/lib/html'
import { Models } from '../model'
import PostItem from '../components/post-item'

const page: Helix.Page<Models> = {
  view(state, prev, actions) {
    return (
      <div className='pv-4'>
        {state.blog.items.map((item, index) => {
          return (
            <PostItem
              key={index}
              className='pb-4 mb-4 bb bc-grey-100'
              {...item}
            />
          )
        })}
      </div>
    )
  },
}

export default page
