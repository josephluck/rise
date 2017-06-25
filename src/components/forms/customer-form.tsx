import h from 'helix-react/lib/html'
import { CustomerFields } from '../../model/checkout'
import Textfield from '../textfield'

export interface Props {
  fields: CustomerFields
  errors: Core.Errors<CustomerFields>
  setFields: Core.SetFields<CustomerFields>
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
      <Textfield
        label='Email'
        value={fields.email}
        errors={errors.email}
        onChange={val => setFields({ email: val })}
        required
      />
    </div>
  )
}
