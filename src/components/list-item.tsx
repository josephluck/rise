import h from 'helix-react/lib/html'

export interface ListItemProps {
  primaryText: any
  secondaryText: any
  onClick?: () => any
}
const ListItem = ({
  primaryText,
  secondaryText,
}: ListItemProps) => {
  return (
    <div className='pv-3 bb bc-grey-100 d-flex align-items-center'>
      <div className='bg-grey-200 w-5 h-5 bra-pill mr-3'></div>
      <div className='flex-1'>
        <div className='mb-1 fc-grey-400 fs-small'>
          {secondaryText}
        </div>
        <div className=''>
          {primaryText}
        </div>
      </div>
      <div>
        <span className='ss-right fc-light-400'></span>
      </div>
    </div>
  )
}

export default ListItem
