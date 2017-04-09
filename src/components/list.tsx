import h from 'helix-react/lib/html'

import ListItem, {ListItemProps} from './list-item'

export interface ListProps {
  items: ListItemProps[]
  className?: string
}
const List = ({
  items,
  className = '',
}: ListProps) => {
  return (
    <ul className={className}>
      {items.map((item, index) => {
        return (
          <li key={index}>
            <ListItem
              primaryText={item.primaryText}
              secondaryText={item.secondaryText}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default List
