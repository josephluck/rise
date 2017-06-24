import shop, { Shop } from './apis/shop'

const moltin = (window as any).Moltin

export interface Apis {
  shop: Shop
}

function setupMoltin() {
  const api = new moltin({
    publicId: 'RVrw4jYbl9XvTM4hRBbJ2cGRcRJlW7evenovhYtLde',
  })
  return new Promise((resolve) => {
    api.Authenticate(_ => {
      resolve(api)
    })
  })
}

export default function () {
  return Promise.all([setupMoltin()])
    .then((apis) => {
      return {
        shop: shop(apis[0]),
      }
    })
}
