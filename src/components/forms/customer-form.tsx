import h from 'helix-react/lib/html'
import {CustomerFields} from '../../model/cart'
import Textfield from '../textfield'
import CollapsableSection from '../collapsable-section'

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
    <CollapsableSection 
      label='Your Details'
      defaultOpen={true}
    >
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
        value={fields.email}
        errors={errors.email}
        onChange={val => setFields({email: val})}
      />
    </CollapsableSection>
  )
}
