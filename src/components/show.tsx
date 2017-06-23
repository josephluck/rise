import h from 'helix-react/lib/html'

export interface Props {
  showing: boolean
  children?: any
  className?: string
}

export default function ({
  showing,
  children,
  className = '',
}: Props) {
  return (
    <div
      className={`
        transition
        ${className}
        ${showing ? 'transition-slide-in' : 'transition-slide-out'}
      `}
    >
      {children}
    </div>
  )
}
