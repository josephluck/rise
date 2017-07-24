import h from 'helix-react/lib/html'

export interface Props {
  showing: boolean
  children?: any
  className?: string
  width?: boolean
}

export default function ({
  showing,
  children,
  className = '',
  width = false,
}: Props) {
  return (
    <div
      className={`
        transition
        ${width ? 'of-hidden' : ''}
        ${className}
        ${showing && !width ? 'transition-slide-in' : 'transition-slide-out'}
        ${showing && width ? 'w-100' : width ? 'w-0' : ''}
      `}
    >
      {children}
    </div>
  )
}
