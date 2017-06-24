import h from 'helix-react/lib/html'
import OptionSelector from '../option-selector'
import AddressForm from './address-form'

export interface Props {
  fields: Core.Shipping
  errors: Core.Errors<Core.Shipping>
  setFields: Core.SetFields<Core.Shipping>
  shippingMethods: Core.SelectOption[]
}

export default function ({
  fields,
  errors,
  setFields,
  shippingMethods,
}: Props) {
  return (
    <div>
      <AddressForm
        fields={fields}
        errors={errors}
        setFields={setFields}
      />
      <OptionSelector
        className='pt-3'
        label='Shipping Method'
        value={fields.shippingMethod}
        errors={errors.shippingMethod}
        onChange={val => setFields({ shippingMethod: val })}
        options={shippingMethods}
        placeholder=''
      />
    </div>
  )
}
