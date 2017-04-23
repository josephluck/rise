import h from 'helix-react/lib/html'

export default function ({active}: {active: boolean}) {
  return (
    <div
      className={`
        pos-relative
        ${active ? 'mr-2' : ''}
      `}
    >
      {active
        ? (
          <div
            className='pos-absolute w-1 h-1 bra-pill bg-primary'
            style={{
              top: '-0.5rem',
              right: '-0.5rem',
            }}
          ></div>
        ) : null
      }
      <a
        className='ss-cart fc-grey-500'
        href={active ? '/cart' : '/shop'}
      />
    </div>
  )
}
