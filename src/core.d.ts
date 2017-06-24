declare namespace Core {
  type Errors<F> = Record<keyof F, string[]>

  type SetFields<F> = (opts: Partial<Record<keyof F, any>>) => any

  interface Product {
    price: number
    images: string[]
    id: string
    title: string
    description: string
  }

  interface CartEntry extends Product {
    quantity: number
  }

  interface Cart {
    items: CartEntry[]
  }

  interface Address {
    firstName: string
    lastName: string
    line1: string
    city?: string
    county?: string
    country: string
    postcode: string
    phone?: string
  }

  interface CheckoutDetails {
    customer: {
      firstName: string
      lastName: string
      email: string
    }
    shippingMethod: string
    gateway: string
    billing: Address
    shipToBillingAddress: boolean
    shipping?: Address
  }
}