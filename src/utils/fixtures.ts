import { expiryMonths, expiryYears } from '../utils/date-select-options'

const test = true

export function address(): Core.Address {
  return test
    ? {
      firstName: 'Bob',
      lastName: 'Marley',
      line1: '10',
      line2: 'New Street',
      city: 'HappyVille',
      county: '',
      country: 'GB',
      postcode: 'SE10 0PT',
      phone: '',
    }
    : {
      firstName: '',
      lastName: '',
      line1: '',
      line2: '',
      city: '',
      county: '',
      country: 'GB',
      postcode: '',
      phone: '',
    }
}

export function billing(): Core.BillingDetails {
  return test
    ? {
      ...address(),
      cardNumber: '4242424242424242',
      expiryMonth: expiryMonths[expiryMonths.length - 1].value,
      expiryYear: expiryYears[expiryYears.length - 1].value,
      cvv: '555',
    }
    : {
      ...address(),
      cardNumber: '',
      expiryMonth: expiryMonths[0].value,
      expiryYear: expiryYears[0].value,
      cvv: '',
    }
}

export function shipping(): Core.ShippingDetails {
  return test
    ? {
      ...address(),
      shippingMethod: '1544468745018147780',
    }
    : {
      ...address(),
      shippingMethod: '',
    }
}

export function customer(): Core.CustomerDetails {
  return test
    ? {
      firstName: 'Bob',
      lastName: 'Marley',
      email: 'get-up@stand.up',
    }
    : {
      firstName: '',
      lastName: '',
      email: '',
    }
}