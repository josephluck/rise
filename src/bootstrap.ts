const moltin = (window as any).Moltin

export interface Apis {
  shop: any
}

function setupMoltin () {
  const shop = new moltin({
    publicId: 'RVrw4jYbl9XvTM4hRBbJ2cGRcRJlW7evenovhYtLde',
  })
  return new Promise((resolve) => {
    shop.Authenticate(abc => {
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
