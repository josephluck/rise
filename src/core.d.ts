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

// {
//   "message": "Payment completed successfully",
//   "redirect": false,
//   "reference": "ch_1AYa8tDrttxoXb46Q4eMgPOO",
//   "data": {
//     "id": "ch_1AYa8tDrttxoXb46Q4eMgPOO",
//     "object": "charge",
//     "amount": 4080,
//     "amount_refunded": 0,
//     "application": null,
//     "application_fee": null,
//     "balance_transaction": "txn_1AYa8tDrttxoXb464YqNNPxJ",
//     "captured": true,
//     "created": 1498394827,
//     "currency": "gbp",
//     "customer": null,
//     "description": "Order #1544970229761704789",
//     "destination": null,
//     "dispute": null,
//     "failure_code": null,
//     "failure_message": null,
//     "fraud_details": [],
//     "invoice": null,
//     "livemode": false,
//     "metadata": [],
//     "on_behalf_of": null,
//     "order": null,
//     "outcome": {
//       "network_status": "approved_by_network",
//       "reason": null,
//       "risk_level": "normal",
//       "seller_message": "Payment complete.",
//       "type": "authorized"
//     },
//     "paid": true,
//     "receipt_email": null,
//     "receipt_number": null,
//     "refunded": false,
//     "refunds": {
//       "object": "list",
//       "data": [],
//       "has_more": false,
//       "total_count": 0,
//       "url": "/v1/charges/ch_1AYa8tDrttxoXb46Q4eMgPOO/refunds"
//     },
//     "review": null,
//     "shipping": null,
//     "source": {
//       "id": "card_1AYa8tDrttxoXb46yf4vhXrU",
//       "object": "card",
//       "address_city": "",
//       "address_country": "GB",
//       "address_line1": "10",
//       "address_line1_check": "pass",
//       "address_line2": "",
//       "address_state": "",
//       "address_zip": "SE10 0PT",
//       "address_zip_check": "pass",
//       "brand": "Visa",
//       "country": "US",
//       "customer": null,
//       "cvc_check": "pass",
//       "dynamic_last4": null,
//       "exp_month": 12,
//       "exp_year": 2028,
//       "fingerprint": "vKzZOIrsr6ng6gZV",
//       "funding": "credit",
//       "last4": "4242",
//       "metadata": [],
//       "name": "Bob Marley",
//       "tokenization_method": null
//     },
//     "source_transfer": null,
//     "statement_descriptor": null,
//     "status": "succeeded",
//     "transfer_group": null
//   },
//   "order": {
//     "id": "1544970229761704789",
//     "order": null,
//     "created_at": "2017-06-25 12:47:05",
//     "updated_at": "2017-06-25 12:47:05",
//     "customer": {
//       "value": "Bob",
//       "data": {
//         "id": "1544945018815382315",
//         "order": null,
//         "created_at": "2017-06-25 11:56:59",
//         "updated_at": "2017-06-25 11:56:59",
//         "first_name": "Bob",
//         "last_name": "Marley",
//         "email": "get-up@stand.up",
//         "group": null,
//         "password": null
//       }
//     },
//     "gateway": {
//       "value": "Stripe",
//       "data": {
//         "name": "Stripe",
//         "slug": "stripe",
//         "description": null,
//         "enabled": true
//       }
//     },
//     "status": {
//       "value": "Paid",
//       "data": {
//         "key": "paid",
//         "value": "Paid"
//       }
//     },
//     "subtotal": 24,
//     "shipping_price": 12,
//     "total": 40.8,
//     "currency": {
//       "value": "British Pound",
//       "data": {
//         "id": "1489725186813985590",
//         "code": "GBP",
//         "title": "British Pound",
//         "enabled": true,
//         "modifier": "+0",
//         "exchange_rate": 0,
//         "format": "£{price}",
//         "decimal_point": ".",
//         "thousand_point": ",",
//         "rounding": null,
//         "default": true,
//         "created_at": null,
//         "updated_at": null
//       }
//     },
//     "currency_code": "GBP",
//     "exchange_rate": 0,
//     "shipping": {
//       "value": "UPS Next Day",
//       "data": {
//         "id": "1544468745018147780",
//         "order": null,
//         "created_at": "2017-06-24 20:10:43",
//         "updated_at": "2017-06-24 20:12:59",
//         "title": "UPS Next Day",
//         "slug": "ups-next-day",
//         "company": "UPS",
//         "status": {
//           "value": "Live",
//           "data": {
//             "key": "1",
//             "value": "Live"
//           }
//         },
//         "price_min": 0,
//         "price_max": 0,
//         "weight_min": 0,
//         "weight_max": 0,
//         "tax_band": {
//           "value": "Default",
//           "data": {
//             "id": "1489725186889482976",
//             "title": "Default",
//             "description": null,
//             "rate": 20,
//             "created_at": null,
//             "updated_at": null
//           }
//         },
//         "description": "",
//         "price": {
//           "value": "£12.00",
//           "data": {
//             "formatted": {
//               "with_tax": "£12.00",
//               "without_tax": "£10.00",
//               "tax": "£2.00"
//             },
//             "rounded": {
//               "with_tax": 12,
//               "without_tax": 10,
//               "tax": 2
//             },
//             "raw": {
//               "with_tax": 12,
//               "without_tax": 10,
//               "tax": 2
//             }
//           }
//         }
//       }
//     },
//     "ship_to": {
//       "value": "",
//       "data": {
//         "id": "1544945021944333100",
//         "order": null,
//         "created_at": "2017-06-25 11:57:00",
//         "updated_at": "2017-06-25 11:57:00",
//         "save_as": "",
//         "first_name": "Bob",
//         "last_name": "Marley",
//         "address_1": "10",
//         "address_2": "",
//         "postcode": "SE10 0PT",
//         "country": {
//           "value": "United Kingdom",
//           "data": {
//             "code": "GB",
//             "name": "United Kingdom"
//           }
//         },
//         "company": "",
//         "city": "",
//         "customer": {
//           "value": "Bob",
//           "data": {
//             "id": "1544945018815382315",
//             "order": null,
//             "created_at": "2017-06-25 11:56:59",
//             "updated_at": "2017-06-25 11:56:59",
//             "first_name": "Bob",
//             "last_name": "Marley",
//             "email": "get-up@stand.up",
//             "group": null,
//             "password": null
//           }
//         },
//         "phone": "",
//         "county": "",
//         "instructions": ""
//       }
//     },
//     "bill_to": {
//       "value": "",
//       "data": {
//         "id": "1544945021944333100",
//         "order": null,
//         "created_at": "2017-06-25 11:57:00",
//         "updated_at": "2017-06-25 11:57:00",
//         "save_as": "",
//         "first_name": "Bob",
//         "last_name": "Marley",
//         "address_1": "10",
//         "address_2": "",
//         "postcode": "SE10 0PT",
//         "country": {
//           "value": "United Kingdom",
//           "data": {
//             "code": "GB",
//             "name": "United Kingdom"
//           }
//         },
//         "company": "",
//         "city": "",
//         "customer": {
//           "value": "Bob",
//           "data": {
//             "id": "1544945018815382315",
//             "order": null,
//             "created_at": "2017-06-25 11:56:59",
//             "updated_at": "2017-06-25 11:56:59",
//             "first_name": "Bob",
//             "last_name": "Marley",
//             "email": "get-up@stand.up",
//             "group": null,
//             "password": null
//           }
//         },
//         "phone": "",
//         "county": "",
//         "instructions": ""
//       }
//     }
//   }
// }
