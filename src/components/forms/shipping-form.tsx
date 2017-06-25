import h from 'helix-react/lib/html'
import OptionSelector from '../option-selector'
import AddressForm from './address-form'
import Currency from '../currency'

export interface Props {
  fields: Core.ShippingFields
  errors: Core.Errors<Core.ShippingFields>
  setFields: Core.SetFields<Core.ShippingFields>
  shippingMethods: Core.ShippingMethod[]
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
        options={shippingMethods.map(method => {
          return {
            label: (
              <span>
                {method.name} - {'£'}<Currency price={method.price} />
              </span>
            ),
            value: method.id,
          }
        })}
        placeholder=''
        required
      />
    </div>
  )
}
