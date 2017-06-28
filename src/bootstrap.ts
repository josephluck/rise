import shop from './apis/shop'
import { Shop } from './apis/types'

export interface Apis {
  shop: Shop
}

export default function (setLoading) {
  return {
    shop: shop(setLoading),
  }
}
