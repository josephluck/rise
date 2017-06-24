export function product(product: any): Core.Product {
  return {
    description: product.description,
    id: product.id,
    images: product.images.map(img => img.url.http),
    price: product.price.data.raw.with_tax,
    title: product.title,
  }
}

export function cart(resp: any): Core.Cart {
  return {
    items: Object.keys(resp.cart.contents)
      .reduce((prev, key) => {
        return prev.concat(resp.cart.contents[key])
      }, [])
      .map(product => {
        return {
          quantity: product.quantity,
          description: product.description,
          id: product.id,
          images: product.images.map(img => img.url.http),
          price: product.pricing.post_discount.raw.with_tax,
          title: product.name,
        }
      }),
  }
}

export function shippingMethods(resp: any): Core.ShippingMethod[] {
  return resp.shipping.methods.map(method => {
    return {
      id: method.id,
      name: method.title,
      price: method.price.data.raw.with_tax,
    }
  })
}
