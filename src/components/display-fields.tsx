import h from 'helix-react/lib/html'

interface Field {
  label: string
  value: string
}

interface Props {
  fields: Field[]
  className?: string
}

export default function ProductList({
  fields,
  className = '',
}: Props) {
  return (
    <div className={`${className}`}>
      {fields
        .filter(field => !!field.value)
        .map((field, index) => {
          return (
            <div
              className={`${index > 0 ? 'mt-3' : ''}`}
              key={index}
            >
              <span className='d-ib w-100 mb-1 fc-grey-500 fs-small'>
                {field.label}
              </span>
              <span className='d-b w-100'>
                {field.value}
              </span>
            </div>
          )
        })}
    </div>
  )
}
