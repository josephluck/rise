import h from 'helix-react/lib/html'

export interface IconOpts {
  icon?: Icons.Icon
  fill?: string
  className?: string
  stroke?: string
  style?: React.CSSProperties
}

const iconSpriteLocation = '/assets/icons/symbol/sprite.svg'

export default function icon({
  icon,
  fill,
  className,
  stroke,
  style,
}: IconOpts = {}) {
  return (
    <svg
      className={`
        icon svg-${icon}-dims
        ${fill ? `fill-${fill}` : ''}
        ${stroke ? `stroke-${stroke}` : ''}
        ${className || ''}
      `}
      style={style}
    >
      <use xlinkHref={`${iconSpriteLocation}#${icon}`} />
    </svg>
  )
}
