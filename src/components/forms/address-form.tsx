import h from 'helix-react/lib/html'
import { AddressFields } from '../../model/checkout'
import Textfield from '../textfield'

export interface Props {
  fields: AddressFields
  errors: Core.Errors<AddressFields>
  setFields: Core.SetFields<AddressFields>
}

export default function ({
  fields,
  errors,
  setFields,
}: Props) {
  return (
    <div>
      <Textfield
        label='Address Line 1'
        value={fields.line1}
        className='pb-3'
        errors={errors.line1}
        onChange={val => setFields({ line1: val })}
        autoFocus
      />
      <Textfield
        label='Address Line 2'
        value={fields.line2}
        className='pb-3'
        errors={errors.line2}
        onChange={val => setFields({ line2: val })}
      />
      <Textfield
        label='Postcode'
        value={fields.postcode}
        className='pb-3'
        errors={errors.postcode}
        onChange={val => setFields({ postcode: val })}
      />
      <Textfield
        label='County'
        value={fields.county}
        errors={errors.county}
        onChange={val => setFields({ county: val })}
      />
    </div>
  )
}
