import h from 'helix-react/lib/html'
import * as Flickity from 'flickity'
import {Component} from 'react'

export default class Carousel extends Component<any, any> {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.setupCarousel()
  }

  shouldComponentUpdate (props) {
    return props.items.length !== this.props.items.length
  }

  componentDidUpdate () {
    this.setupCarousel()
  }

  setupCarousel () {
    if (this.props.items.length) {
      new Flickity(this.refs.carousel)
    }
  }

  render () {
    return (
      <div
        className='carousel mb-4'
        ref='carousel'
      >
        {this.props.items.map((itm, index) => {
          return (
            <div key={index} className='carousel-item w-100'>
              {this.props.item(itm)}
            </div>
          )
        })}
      </div>
    )
  }
}