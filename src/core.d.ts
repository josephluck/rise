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

  interface Person {
    name: string
    description: string
    avatar: string
  }

  interface Address {
    firstName: string
    lastName: string
    line1: string
    line2?: string
    city?: string
    county?: string
    country: string
    postcode: string
    phone?: string
  }

  interface ShippingFields extends Address {
    shippingMethod: string
  }

  interface SelectOption {
    label: string
    value: string
  }

  interface OptionSelectorOption {
    label: React.ReactNode
    value: string
  }

  interface CheckoutFields {
    customer: {
      firstName: string
      lastName: string
      email: string
    }
    shippingMethod: string
    gateway: string
    billing: Address
    useShippingAddress: boolean
    shipping?: Address
  }

  interface PaymentFields {
    orderId: string
    firstName: string
    lastName: string
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvv: string
  }

  interface BillingFields extends Address {
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvv: string
  }

  interface CustomerFields {
    firstName: string
    lastName: string
    email: string
  }

  interface ShippingMethod {
    id: string
    name: string
    price: number
  }

  interface PaymentCard {
    id: string
    brand: string
    last4: string
    expiryMonth: string
    expiryYear: string
    address: Address
    name: string
  }

  interface Refund {

  }

  interface Order {
    id: string
    status: 'pending' | 'paid' | 'shipped' // TODO: Work out the options here
    items: CartEntry[]
    customer: Customer
    shippingAddress: Address
    shippingMethod: ShippingMethod
    billingAddress: Address
    paymentCard: PaymentCard
    dateCreated: string
    datePaid: string
    refunds: Refund[]
    refunded: number
    totals: Totals
  }

  interface Totals {
    subTotal: number
    total: number
    shipping: number
    quantity: number
  }

  interface Customer {
    id: string
    hasAccount: boolean
    firstName: string
    lastName: string
    email: string
    dateCreated: string
  }
}
