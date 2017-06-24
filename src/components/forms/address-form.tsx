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
        label='First Name'
        className='pb-3'
        value={fields.first_name}
        errors={errors.first_name}
        onChange={val => setFields({ first_name: val })}
        autoFocus
      />
      <Textfield
        label='Last Name'
        value={fields.last_name}
        className='pb-3'
        errors={errors.last_name}
        onChange={val => setFields({ last_name: val })}
      />
      <Textfield
        label='Address Line 1'
        value={fields.line_1}
        className='pb-3'
        errors={errors.line_1}
        onChange={val => setFields({ line_1: val })}
      />
      <Textfield
        label='Address Line 2'
        value={fields.line_2}
        className='pb-3'
        errors={errors.line_2}
        onChange={val => setFields({ line_2: val })}
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
