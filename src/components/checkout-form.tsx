import h from 'helix-react/lib/html'
import Textfield from './textfield'

const CheckoutForm = () => {
  return (
    <div>
      <Textfield
        label='First Name'
        className='mb-3'
        autoFocus
      />
      <Textfield
        label='Last Name'
        className='mb-3'
      />
      <Textfield
        label='Address Line 1'
        className='mb-3'
      />
      <Textfield
        label='Address Line 2'
        className='mb-3'
      />
      <Textfield
        label='Address Line 3'
        className='mb-3'
      />
      <Textfield
        label='Town'
        className='mb-3'
      />
      <Textfield
        label='County'
        className='mb-3'
      />
      <Textfield
        label='Post Code'
        className='mb-3'
      />
    </div>
  )
}

export default CheckoutForm
