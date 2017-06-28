import * as desanitize from './desanitize'
import config from '../../config'

export default function api(http) {
  return {
    posts: {
      all(): Promise<Core.Post[]> {
        return http.get(`${config.WORDPRESS_API_ROOT}/posts`)
          .then(resp => resp.data.posts.map(desanitize.post))
      },
      fetch(postId: string): Promise<Core.Post> {
        return http.get(`${config.WORDPRESS_API_ROOT}/posts/${postId}`)
          .then(resp => desanitize.post(resp.data))
      },
    },
  }
}
