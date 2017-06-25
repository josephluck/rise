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
        label='Line 1'
        value={fields.line1}
        className='pb-3'
        errors={errors.line1}
        onChange={val => setFields({ line1: val })}
        autoFocus
        required
      />
      <Textfield
        label='Line 2'
        value={fields.line2}
        className='pb-3'
        errors={errors.line2}
        onChange={val => setFields({ line2: val })}
      />
      <Select
        label='Country'
        className='pb-3'
        value={fields.country}
        errors={errors.country}
        onChange={val => setFields({ country: val })}
        options={forSelect}
        placeholder=''
        required
      />
      <div className='d-flex pb-3'>
        <Textfield
          label='Postcode'
          value={fields.postcode}
          className='pr-1'
          errors={errors.postcode}
          onChange={val => setFields({ postcode: val })}
          required
        />
        <Textfield
          label='City'
          value={fields.city}
          className='ph-1'
          errors={errors.city}
          onChange={val => setFields({ city: val })}
        />
        <Textfield
          label='County'
          value={fields.county}
          className='pl-1'
          errors={errors.county}
          onChange={val => setFields({ county: val })}
        />
      </div>
      <Textfield
        label='Phone Number'
        value={fields.phone}
        errors={errors.phone}
        onChange={val => setFields({ phone: val })}
      />
    </div>
  )
}
