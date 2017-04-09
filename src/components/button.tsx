import h from 'helix-react/lib/html'

export type Style = 'primary' | 'secondary'
export type Size = 'small' | 'medium' | 'large'

export interface Props {
  label?: string
  className?: string
  type?: string
  style?: Style
  size?: Size
  onClick?: () => any
}

function getStyle (style: Style): string {
  if (style === 'primary') {
    return 'bw-none bg-primary fc-white'
  } else {
    return 'bs-solid bw-medium bc-grey-300 fc-grey-400 bg-white'
  }
}

function getSize (size: Size): string {
  if (size === 'small') {
    return 'lh-5 ph-2 pv-1 fs-small'
  } else {
    return 'lh-5 ph-3 pv-2'
  }
}

export default function ({
  label,
  className = '',
  type = 'button',
  style = 'primary',
  size = 'medium',
  onClick = () => null,
}: Props) {
  const styleClass = getStyle(style)
  const sizeClass = getSize(size)
  return (
    <button
      onClick={onClick}
      className={`
        tt-uppercase fw-700 bra-2
        ${styleClass}
        ${sizeClass}
        ${className}
      `}
    >
      {label}
    </button>
  )
}
