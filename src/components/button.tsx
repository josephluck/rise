import h from 'helix-react/lib/html'

export type Size = 'small' | 'medium' | 'large'

export interface Props {
  label: string
  className?: string
  type?: string
  size?: string
  onClick?: () => any
  href?: string
}

function getSizeClass (size) {
  if (size === 'small') {
    return 'ph-2 pv-1 fw-300 bw-small fs-tiny bc-grey-600'
  } else if (size === 'medium') {
    return 'ph-3 pv-2 fw-300 bw-small fs-small bc-grey-600'
  } else {
    return 'ph-4 pv-3 fw-500 bw-medium bc-black'
  }
}

export default function ({
  label,
  className = '',
  type = 'button',
  size = 'medium',
  onClick = () => null,
  href,
}: Props) {
  const baseClass = 'd-ib tt-uppercase bra-2 bg-white ba c-pointer'
  const sizeClass = getSizeClass(size)
  const buttonClass = `${baseClass} ${sizeClass} ${className}`
  if (href) {
    return (
      <a
        className={buttonClass}
        href={href}
      >
        {label}
      </a>
    )
  } else {
    return (
      <button
        onClick={onClick}
        className={buttonClass}
      >
        {label}
      </button>
    )
  }
}
