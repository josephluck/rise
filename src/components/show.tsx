import h from 'helix-react/lib/html'

export interface Props {
  showing: boolean
  children?: any
}

export default function ({
  showing,
  children,
}: Props) {
  return (
    <div
      className={`
        transition
        ${showing ? 'transition-slide-in' : 'transition-slide-out'}
      `}
    >
      {children}
    </div>
  )
}
