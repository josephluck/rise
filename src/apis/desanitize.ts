export function addressFromOrder(resp: any): Core.Address {
  return {
    // id: resp.id,
    firstName: resp.first_name,
    lastName: resp.last_name,
    line1: resp.address_1,
    line2: resp.address_2,
    city: resp.city,
    county: resp.county,
    country: resp.country.value,
    postcode: resp.postcode,
    phone: resp.phone,
  }
}

export function cart(resp: any): Core.Cart {
  return {
    items: Object.keys(resp.cart.contents)
      .reduce((prev, key) => {
        return prev.concat(resp.cart.contents[key])
      }, [])
      .map(p => {
        return {
          quantity: p.quantity,
          description: p.description,
          id: p.id,
          images: p.images.map(img => img.url.http),
          price: p.pricing.post_discount.raw.with_tax,
          title: p.name,
        }
      }),
  }
}

export function customerFromOrder(resp: any): Core.Customer {
  return {
    id: resp.customer.data.id,
    hasAccount: !!resp.customer.data.password,
    firstName: resp.customer.data.first_name,
    lastName: resp.customer.data.last_name,
    email: resp.customer.data.email,
    dateCreated: resp.customer.data.created_at,
  }
}

export function order(resp: any): Core.Order {
  return {
    id: resp.order.id,
    status: resp.order.status.value === 'Paid' ? 'paid' : 'pending',
    items: [], // TODO: use the orders/id/items endpoint
    customer: customerFromOrder(resp.order),
    shippingAddress: addressFromOrder(resp.order.ship_to.data),
    shippingMethod: shippingMethodFromOrder(resp.order),
    billingAddress: addressFromOrder(resp.order.bill_to.data),
    paymentCard: paymentCardFromPayment(resp.payment),
    dateCreated: resp.order.created_at,
    datePaid: resp.payment.created.toString(),
    refunds: [], // TODO: create the type for this when refunds have been tested
    refunded: 0, // TODO: see above
    totals: totalsFromOrder(resp.order),
  }
}

export function paymentCardFromPayment(resp: any): Core.PaymentCard {
  return {
    id: resp.id,
    brand: resp.source.brand,
    last4: resp.source.last4,
    expiryMonth: resp.source.exp_month,
    expiryYear: resp.source.exp_year,
    address: {
      firstName: resp.source.name.split(' ')[0],
      lastName: resp.source.name.split(' ')[1],
      line1: resp.source.address_line1,
      line2: resp.source.address_line2,
      city: resp.source.address_city,
      county: resp.source.address_state,
      country: resp.source.address_country,
      postcode: resp.source.address_zip,
      phone: '',
    },
    name: resp.payment.source.name,
  }
}

export function post(resp: any): Core.Post {
  return {
    author: {
      name: resp.author.name,
      description: '',
      avatar: resp.author.avatar,
    },
    content: resp.content,
    excerpt: resp.excerpt,
    id: resp.ID,
    title: resp.title,
    thumbnail: resp.post_thumbnail.URL || null,
  }
}

export function product(resp: any): Core.Product {
  return {
    description: resp.description,
    id: resp.id,
    images: resp.images.map(i => i.url.http),
    price: resp.price.data.raw.with_tax,
    title: resp.title,
  }
}

export function shippingMethods(resp: any): Core.ShippingMethod[] {
  return resp.shipping.methods.map(m => {
    return {
      id: m.id,
      name: m.title,
      price: m.price.data.raw.with_tax,
    }
  })
}

export function shippingMethodFromOrder(resp: any): Core.ShippingMethod {
  return {
    id: resp.shipping.data.id,
    name: resp.shipping.data.title,
    price: resp.shipping.data.price.data.raw.with_tax,
  }
}

export function totalsFromOrder(resp): Core.Totals {
  return {
    subTotal: resp.total - resp.shipping_price,
    total: resp.total,
    shipping: resp.shipping_price,
    quantity: 0, // TODO: use the orders/id/items endpoint
  }
}
