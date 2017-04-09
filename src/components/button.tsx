import h from 'helix-react/lib/html'

export type Style = 'primary' | 'secondary'
export type Size = 'small' | 'medium' | 'large'

export interface Props {
  label?: string
  className?: string
  type?: string
  onClick?: () => any
  href?: string
}

export default function ({
  label,
  className = '',
  type = 'button',
  onClick = () => null,
  href,
}: Props) {
  const buttonClass = `
    d-ib tt-uppercase fw-500 bw-medium ph-4 pv-3 bra-2 bg-white bc-black ba c-pointer
    ${className}
  `
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
