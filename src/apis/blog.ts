// import * as desanitize from './desanitize'
import config from '../../config'

export default function api(http) {
  return {
    posts: {
      all(): Promise<Core.Post[]> {
        return http.get(`${config.WORDPRESS_API_ROOT}/posts`)
          .then(resp => resp.data)
      },
    },
  }
}
