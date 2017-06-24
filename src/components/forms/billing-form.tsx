import h from 'helix-react/lib/html'
import Textfield from '../textfield'
import AddressForm from './address-form'
import * as Collapse from 'react-collapse'

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
      <Textfield
        label='CVV'
        value={fields.cvv}
        className='pb-3'
        errors={errors.cvv}
        onChange={val => setFields({ cvv: val })}
      />
    </div>
  )
}
