import http from './apis/http'
import shop from './apis/shop'
import blog from './apis/blog'
import scroll, { Scroll } from './apis/scroll'
import { Shop, Blog } from './apis/types'

export interface Apis {
  shop: Shop
  blog: Blog
  scroll: Scroll
}

export default function (setLoading) {
  return {
    shop: shop(http(setLoading)),
    blog: blog(http(setLoading)),
    scroll,
  }
}
