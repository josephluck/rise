import h from 'helix-react/lib/html'

import DisplayFields from './display-fields'

export interface Props {
  address: Core.Address
  className?: string
}

export default function ({
  address,
  className = '',
}: Props) {
  return (
    <DisplayFields
      className={className}
      fields={[
        { label: 'First Name', value: address.firstName },
        { label: 'Last Name', value: address.lastName },
        { label: 'Line 1', value: address.line1 },
        { label: 'Line 2', value: address.line2 },
        { label: 'City', value: address.city },
        { label: 'County', value: address.county },
        { label: 'Country', value: address.country },
        { label: 'Postcode', value: address.postcode },
        { label: 'Phone', value: address.phone },
      ]}
    />
  )
}
