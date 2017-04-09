import h from 'helix-react/lib/html'

export default function ({active}: {active: boolean}) {
  return (
    <div className='pos-relative'>
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
      <span
        className='ss-cart fc-grey-500'
      />
    </div>
  )
}
