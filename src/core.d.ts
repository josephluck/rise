declare namespace Core {

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

  interface BillingFields extends Address {
    cardNumber: string
    expiryMonth: string
    expiryYear: string
    cvv: string
  }

  interface Cart {
    items: CartEntry[]
  }

  interface CartEntry extends Product {
    quantity: number
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

  interface Customer {
    id: string
    hasAccount: boolean
    firstName: string
    lastName: string
    email: string
    dateCreated: string
  }

  interface CustomerFields {
    firstName: string
    lastName: string
    email: string
  }

  type Errors<F> = Record<keyof F, string[]>

  interface OptionSelectorOption {
    label: React.ReactNode
    value: string
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

  interface PaymentCard {
    id: string
    brand: string
    last4: string
    expiryMonth: string
    expiryYear: string
    address: Address
    name: string
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

  interface Person {
    name: string
    description: string
    avatar: string
  }

  interface Product {
    price: number
    images: string[]
    id: string
    title: string
    description: string
  }

  interface Refund { }

  interface SelectOption {
    label: string
    value: string
  }

  type SetFields<F> = (opts: Partial<Record<keyof F, any>>) => any

  interface ShippingFields extends Address {
    shippingMethod: string
  }

  interface ShippingMethod {
    id: string
    name: string
    price: number
  }

  interface Totals {
    subTotal: number
    total: number
    shipping: number
    quantity: number
  }
}
