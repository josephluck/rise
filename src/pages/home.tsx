import h from 'helix-react/lib/html'
import { Models } from '../model'
import Button from '../components/button'
import Carousel from '../components/carousel'
// import ProductControls from '../components/add-product-controls'
import Currency from '../components/currency'

const page: Helix.Page<Models> = {
  onEnter(_state, _prev, actions) {
    actions.products.fetchAll()
  },
  view(state, prev, actions) {
    return (
      <div>
        <Carousel
          autoPlay
          key='home-products-carousel'
          items={state.products.products}
          item={product => {
            return (
              <div>
                <div
                  className='h-10 d-flex flex-direction-column mb-3'
                  style={{
                    backgroundImage: `url(${product.images[0]})`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <a
                  href={`/shop/${product.id}`}
                  className='d-b'
                >
                  <div className='d-flex align-items-center'>
                    <div className='fw-500 flex-1 mr-2'>{product.title}</div>
                    <div className='fc-grey-900'>
                      {'£'}<Currency price={product.price} />
                    </div>
                  </div>
                  {/*<div className='d-ib ta-c mt-2'>
                    <ProductControls
                      onAddToCart={(quantity) => {
                        actions.cart.add({
                          ...product,
                          quantity,
                        })
                      }}
                    />
                  </div>*/}
                </a>
              </div>
            )
          }}
        />
        <div className='pv-5'>
          <div className='ta-c ph-4 mb-9'>
            <div className='fs-heading mb-4 fw-500'>Baking Lives Better</div>
            <div className='lh-5 mb-4'>Lorem ipsum dolor sit amet</div>
            <Button
              label='Shop'
              href='/shop'
              size='large'
              className='bra-pill w-100'
            />
          </div>
          <div className='ta-c ph-4 mb-9'>
            <div className='fs-heading mb-4 fw-500'>Local, London</div>
            <div className='lh-5 mb-4'>
              We are based just off Brick Lane. We honed our trade selling cakes to local businesses. And after a couple of years our cakes were going down so well locally, we decided to start selling our amazingly delicious brownies online too.
            </div>
            <Button
              label='Our Story'
              href='/about'
              size='large'
              className='bra-pill w-100'
            />
          </div>
          <div className='ta-c ph-4 mb-9'>
            <div className='fs-heading mb-4 fw-500'>Award Winning</div>
            <div className='lh-5 mb-4'>
              Our parent charity - Providence Row - was founded over 150 years ago. We've been based in the East End for all of that time and food has always played a HUGE role in what we do. We now run multi-award winning catering training programmes and are absolutely brilliant at doing so.
            </div>
            <Carousel
              autoPlay
              items={[
                { title: 'London Homelessness Awards - 2nd Place - 2015', img: 'https://static1.squarespace.com/static/56afc080a3360cedc16daaf5/56eabca15559861e784d8dec/56eabd4007eaa03f5db84756/1458224884115/LHAwards_new_logo.jpg?format=300w' },
                { title: 'GovKnow Social Justice Award - Winners - 2014', img: 'https://static1.squarespace.com/static/56afc080a3360cedc16daaf5/56eabca15559861e784d8dec/56eabdb34c2f85a15d46fd43/1458225082472/SOCIAL+JUSTICE+2014+WINNER.jpg?format=300w' },
                { title: 'Social Inclusion Award - Winner - 2013', img: 'https://static1.squarespace.com/static/56afc080a3360cedc16daaf5/56eabca15559861e784d8dec/56eabdae4c2f85a15d46fd1e/1458225054606/logo.png?format=500w' },
              ]}
              item={item => {
                return (
                  <div
                    className='d-flex flex-direction-column pa-3 of-hidden'
                    style={{
                      height: '16rem',
                    }}
                  >
                    <div
                      className='flex-1'
                      style={{
                        backgroundImage: `url(${item.img})`,
                        backgroundPosition: 'center center',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                    <div className='tc mt-5 tt-uppercase fs-small lh-5'>
                      {item.title}
                    </div>
                  </div>
                )
              }}
            />
          </div>
        </div>
      </div>
    )
  },
}

export default page
