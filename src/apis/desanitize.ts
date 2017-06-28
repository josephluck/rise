export function addressFromOrder(address: any): Core.Address {
  return {
    // id: address.id,
    firstName: address.first_name,
    lastName: address.last_name,
    line1: address.address_1,
    line2: address.address_2,
    city: address.city,
    county: address.county,
    country: address.country.value,
    postcode: address.postcode,
    phone: address.phone,
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

export function customerFromOrder(order: any): Core.Customer {
  const customer = order.customer.data
  return {
    id: customer.id,
    hasAccount: !!customer.password,
    firstName: customer.first_name,
    lastName: customer.last_name,
    email: customer.email,
    dateCreated: customer.created_at,
  }
}

export function order(resp: any): Core.Order {
  const order = resp.order
  const payment = resp.data
  return {
    id: order.id,
    status: order.status.value === 'Paid' ? 'paid' : 'pending',
    items: [], // TODO: use the orders/id/items endpoint
    customer: customerFromOrder(order),
    shippingAddress: addressFromOrder(order.ship_to.data),
    shippingMethod: shippingMethodFromOrder(order),
    billingAddress: addressFromOrder(order.bill_to.data),
    paymentCard: paymentCardFromPayment(payment),
    dateCreated: order.created_at,
    datePaid: payment.created.toString(),
    refunds: [], // TODO: create the type for this when refunds have been tested
    refunded: 0, // TODO: see above
    totals: totalsFromOrder(order),
  }
}

export function paymentCardFromPayment(payment: any): Core.PaymentCard {
  return {
    id: payment.id,
    brand: payment.source.brand,
    last4: payment.source.last4,
    expiryMonth: payment.source.exp_month,
    expiryYear: payment.source.exp_year,
    address: {
      firstName: payment.source.name.split(' ')[0],
      lastName: payment.source.name.split(' ')[1],
      line1: payment.source.address_line1,
      line2: payment.source.address_line2,
      city: payment.source.address_city,
      county: payment.source.address_state,
      country: payment.source.address_country,
      postcode: payment.source.address_zip,
      phone: '',
    },
    name: payment.source.name,
  }
}

export function product(product: any): Core.Product {
  return {
    description: product.description,
    id: product.id,
    images: product.images.map(img => img.url.http),
    price: product.price.data.raw.with_tax,
    title: product.title,
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

export function shippingMethodFromOrder(order: any): Core.ShippingMethod {
  const method = order.shipping.data
  return {
    id: method.id,
    name: method.title,
    price: method.price.data.raw.with_tax,
  }
}

export function totalsFromOrder(order): Core.Totals {
  return {
    subTotal: order.total - order.shipping_price,
    total: order.total,
    shipping: order.shipping_price,
    quantity: 0, // TODO: use the orders/id/items endpoint
  }
}
