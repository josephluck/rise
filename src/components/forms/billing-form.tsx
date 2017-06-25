import h from 'helix-react/lib/html'
import Textfield from '../textfield'
import Select from '../select'
import AddressForm from './address-form'
import * as Collapse from 'react-collapse'
import { expiryMonths, expiryYears } from '../../utils/date-select-options'

export interface Props {
  fields: Core.BillingDetails
  errors: Core.Errors<Core.BillingDetails>
  setFields: Core.SetFields<Core.BillingDetails>
  useShippingAddress: boolean
  toggleUseShippingAddress: (use: boolean) => any
}

export default function ({
  fields,
  errors,
  setFields,
  useShippingAddress,
  toggleUseShippingAddress,
}: Props) {
  return (
    <div>
      <Textfield
        label='First Name'
        className='pb-3'
        value={fields.firstName}
        errors={errors.firstName}
        onChange={val => setFields({ firstName: val })}
        autoFocus
        required
      />
      <Textfield
        label='Last Name'
        className='pb-3'
        value={fields.lastName}
        errors={errors.lastName}
        onChange={val => setFields({ lastName: val })}
        required
      />
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
        required
      />
      <div className='d-flex'>
        <Select
          label='Exp Month'
          className='flex-1 pr-1'
          value={fields.expiryMonth}
          errors={errors.expiryMonth}
          onChange={val => setFields({ expiryMonth: val })}
          options={expiryMonths}
          placeholder=''
          required
        />
        <Select
          label='Exp Year'
          className='flex-1 ph-1'
          value={fields.expiryYear}
          errors={errors.expiryYear}
          onChange={val => setFields({ expiryYear: val })}
          options={expiryYears}
          placeholder=''
          required
        />
        <Textfield
          label='CVV'
          value={fields.cvv}
          className='flex-1 pl-1'
          errors={errors.cvv}
          onChange={val => setFields({ cvv: val })}
          required
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
