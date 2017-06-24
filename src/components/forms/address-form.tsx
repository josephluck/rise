import h from 'helix-react/lib/html'
import Textfield from '../textfield'
import Select from '../select'
import { forSelect } from '../../countries'

export interface Props {
  fields: Core.Address
  errors: Core.Errors<Core.Address>
  setFields: Core.SetFields<Core.Address>
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
        label='City'
        value={fields.city}
        className='pb-3'
        errors={errors.city}
        onChange={val => setFields({ city: val })}
      />
      <Textfield
        label='Postcode'
        value={fields.postcode}
        className='pb-3'
        errors={errors.postcode}
        onChange={val => setFields({ postcode: val })}
      />
      <Select
        label='Country'
        value={fields.country}
        errors={errors.country}
        onChange={val => setFields({ country: val })}
        options={forSelect}
        placeholder=''
      />
    </div>
  )
}
