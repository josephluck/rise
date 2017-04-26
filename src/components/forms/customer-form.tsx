import h from 'helix-react/lib/html'
import {CustomerFields} from '../../model/cart'
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
    <div className='of-hidden pt-4'>
      <Textfield
        label='Name'
        className='pb-3'
        value={fields.name}
        errors={errors.name}
        onChange={val => setFields({name: val})}
        autoFocus
      />
      <Textfield
        label='Email'
        className='pb-3'
        value={fields.email}
        errors={errors.email}
        onChange={val => setFields({email: val})}
      />
    </div>
  )
}
