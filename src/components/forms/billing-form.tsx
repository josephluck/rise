import h from 'helix-react/lib/html'
import Textfield from '../textfield'
import Select from '../select'
import AddressForm from './address-form'
import * as Collapse from 'react-collapse'

export interface Props {
  fields: Core.BillingDetails
  errors: Core.Errors<Core.BillingDetails>
  setFields: Core.SetFields<Core.BillingDetails>
  useShippingAddress: boolean
  toggleUseShippingAddress: (use: boolean) => any
}

const createExpiryMonths = (): Core.SelectOption[] => {
  return Array.from({ length: 12 })
    .map((_, index) => {
      const value = index + 1 < 10
        ? `0${index + 1}`
        : (index + 1).toString()
      return {
        value,
        label: value,
      }
    })
}

const createExpiryYears = (): Core.SelectOption[] => {
  const thisYear = new Date().getFullYear()
  return Array.from({ length: 12 })
    .map((_, index) => {
      const value = ((thisYear + index) % 2000).toString()
      return {
        value,
        label: value,
      }
    })
}

const expiryMonths = createExpiryMonths()
const expiryYears = createExpiryYears()

export default function ({
  fields,
  errors,
  setFields,
  useShippingAddress,
  toggleUseShippingAddress,
}: Props) {
  return (
    <div>
      <label className='d-flex align-items-center pb-3'>
        <input
          type='checkbox'
          checked={useShippingAddress}
          onChange={_ => toggleUseShippingAddress(!useShippingAddress)}
          className='mr-2'
        />
        Use Shipping Address
      </label>
      <Collapse
        hasNestedCollapse
        isOpened={!useShippingAddress}
      >
        <div className='pb-3'>
          <AddressForm
            fields={fields}
            errors={errors}
            setFields={setFields}
          />
        </div>
      </Collapse>
      <Textfield
        label='Card Number'
        value={fields.cardNumber}
        className='pb-3'
        errors={errors.cardNumber}
        onChange={val => setFields({ cardNumber: val })}
        autoFocus
      />
      <div className='d-flex'>
        <Select
          label='Expiry Month'
          className='flex-1 pr-2'
          value={fields.expiryMonth}
          errors={errors.expiryMonth}
          onChange={val => setFields({ expiryMonth: val })}
          options={expiryMonths}
          placeholder=''
        />
        <Select
          label='Expiry Month'
          className='flex-1 ph-2'
          value={fields.expiryYear}
          errors={errors.expiryYear}
          onChange={val => setFields({ expiryYear: val })}
          options={expiryYears}
          placeholder=''
        />
        <Textfield
          label='CVV'
          value={fields.cvv}
          className='flex-1 pl-2'
          errors={errors.cvv}
          onChange={val => setFields({ cvv: val })}
        />
      </div>
    </div>
  )
}

// orderId: string
// firstName: string
// lastName: string
// cardNumber: string
// expiryMonth: string
// expiryYear: string
// cvv: string
