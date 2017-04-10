import * as Moltin from 'moltin'

export interface Apis {
  shop: any
}

function setupMoltin () {
  const shop = new Moltin({publicId: 'RVrw4jYbl9XvTM4hRBbJ2cGRcRJlW7evenovhYtLde'})
  return new Promise((resolve) => {
    shop.Authenticate(() => {
      resolve(shop)
    })
  })
}

export default function (): Promise<Apis> {
  return Promise.all([setupMoltin()])
    .then((apis) => {
      return {
        shop: apis[0],
      }
    })
}
