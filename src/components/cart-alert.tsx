import h from 'helix-react/lib/html'
import Button from './button'

export interface Props {
  items: number
}

export default function ({
  items,
}: Props) {
  return (
    <div
      className={`
        pos-fixed posb-0 posl-0 w-100 bt bc-grey-100 bg-grey-50
        transition
        ${items ? 'transition-slide-in' : 'transition-slide-out'}
      `}
    >
      <div className='max-width ml-auto mr-auto flex-1 d-flex pa-3 tt-uppercase fs-small'>
        <span className='flex-1 d-flex align-items-center'>
          <span className='d-ib w-1 h-1 bra-pill bg-primary mr-2'></span>
          {items}{' items in your basket'}
        </span>
        <Button
          label='Checkout'
          className='bg-transparent'
          size='small'
          href='/cart'
        />
      </div>
    </div>
  )
}
