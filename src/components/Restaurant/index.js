import React, { PureComponent } from 'react';
import { BackIcon } from 'components/BackIcon'
import Bookmark from 'components/Bookmark'
import Map from 'components/Map'
import './style.css';

class Restaurant extends PureComponent {
  constructor() {
    super()
    this.map = React.createRef()
  }

  formatHour = hour => {
    const numbers = hour.match(/\d{2}/g)
    return numbers[0] + ':' + numbers[1]
  }

  render() {
    const { data, coords, history } = this.props
    console.log(data)
    const price = [ ...Array(data.price_range).keys() ].reduce((prev, curr) => prev + '$', '')
    
    return (
      <div className="business">
        <header>
          <button className="btn-back" onClick={history.goBack} >
            <BackIcon />
          </button>
        </header>
        <main className="business__container">
          <div className="hero-image" style={{ backgroundImage: `url(${data.featured_image})` }} />
          <div className="business__info">
            <div className="business__details">
              <Bookmark rating={data.user_rating} />
              <p className="business__categories">{data.cuisines}</p>
              <h1 className="business__name">
                {data.name}
                <span className="business__price"> | {price}</span>
              </h1>
              <div className="business__contact">
                <p className="business__location">{data.location.address}</p>
                <p className="business__cost">Average cost for two: {data.average_cost_for_two}{data.currency} </p>
              </div>
            </div>
          </div>
          <Map map={this.map} places={[ { restaurant: data } ]} coords={coords} />
        </main>
      </div>
    )
  }
}

export default Restaurant