import h from 'helix-react/lib/html'

import Icon from './icon'

export default function ({ active }: { active: boolean }) {
  return (
    <div
      className={`
        pos-relative d-flex align-items-center
      `}
    >
      <a
        href={active ? '/cart' : '/shop'}
        className='d-n-l'
      >
        <Icon icon='cart' />
      </a>
      <a
        href={active ? '/checkout' : '/shop'}
        className='d-n d-b-l'
      >
        <Icon icon='cart' />
      </a>
      {active
        ? (
          <div
            className='w-1 h-1 bra-pill bg-primary'
          ></div>
        ) : null
      }
    </div>
  )
}
