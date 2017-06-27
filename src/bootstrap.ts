import shop, { Shop } from './apis/shop'

export interface Apis {
  shop: Shop
}

export default function () {
  return {
    shop: shop(),
  }
}
